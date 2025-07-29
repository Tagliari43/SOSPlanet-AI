// src/pages/UtopiaRoom.tsx - VERSÃO 3.1 - CONEXÃO ROBUSTA

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

const ENDERECO_SERVIDOR = "https://sosplanet-backend.onrender.com";
const socket = io(`${ENDERECO_SERVIDOR}/utopia`);

const UtopiaRoom: React.FC = () => {
  const [nomeUsuario, setNomeUsuario] = useState('Anônimo');
  const [mensagem, setMensagem] = useState('');
  const [historicoChat, setHistoricoChat] = useState<{ autor: string, mensagem: string }[]>([]);
  const [estaConectado, setEstaConectado] = useState(false); // <-- NOSSO NOVO ESTADO DE CONTROLE
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const membroNome = urlParams.get('membro');
    if (membroNome) {
      setNomeUsuario(membroNome);
    }
    
    // Quando a conexão for um SUCESSO, ativamos a sala
    socket.on('connect', () => {
      setEstaConectado(true);
    });

    socket.on('utopia_message', (novaMensagem) => {
      setHistoricoChat((historicoAnterior) => [...historicoAnterior, novaMensagem]);
    });

    return () => {
      socket.off('connect');
      socket.off('utopia_message');
    };
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [historicoChat]);

  const enviarMensagem = () => {
    if (mensagem.trim() && estaConectado) { // Só envia se estiver conectado
      socket.emit('utopia_message', { autor: nomeUsuario, mensagem });
      setMensagem('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-4">
      <h1 className="text-3xl font-bold text-center text-purple-400 mb-4">
        Santuário Utopia - Nova Sociedade
      </h1>
      <div 
        ref={chatContainerRef}
        className="flex-grow bg-gray-800 rounded-lg p-4 overflow-y-auto mb-4 border border-purple-500"
      >
        {historicoChat.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold text-cyan-400">{msg.autor}: </span>
            <span>{msg.mensagem}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && enviarMensagem()}
          placeholder={estaConectado ? "Digite sua mensagem na Utopia..." : "Conectando ao Santuário..."}
          className="flex-grow bg-gray-700 text-white rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          disabled={!estaConectado} // <-- A CAIXA FICA "TRAVADA" ATÉ A CONEXÃO SER PERFEITA
        />
        <button
          onClick={enviarMensagem}
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-r-lg px-4 py-2 disabled:bg-gray-500"
          disabled={!estaConectado} // <-- O BOTÃO FICA "TRAVADO" ATÉ A CONEXÃO SER PERFEITA
        >
          Enviar
        </button>
      </div>
    </div>
  );
};

export default UtopiaRoom;