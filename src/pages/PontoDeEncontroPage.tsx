// src/pages/PontoDeEncontroPage.tsx

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

// Define a "forma" de uma mensagem de chat
interface ChatMessage {
  autor: string;
  mensagem: string;
  timestamp?: string;
}

const PontoDeEncontroPage = () => {
  // Guarda a instância da nossa conexão com o servidor
  const socketRef = useRef<Socket | null>(null);
  
  // Estados para o chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [username, setUsername] = useState('Eder');
  const [isConnected, setIsConnected] = useState(false);

  // Efeito que roda uma vez para conectar ao servidor
  useEffect(() => {
    // Conecta ao nosso backend Python na porta 5000
    const socket = io('https://sosplanet-backend.onrender.com');
    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Conectado ao servidor de chat!');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('Desconectado do servidor de chat.');
      setIsConnected(false);
    });

    // O "ouvido" que fica esperando por novas mensagens do servidor
    socket.on('chat_message', (newMessage: ChatMessage) => {
      newMessage.timestamp = new Date().toLocaleTimeString('pt-BR');
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Função de limpeza: desconecta quando o componente é desmontado
    return () => {
      socket.disconnect();
    };
  }, []); // O array vazio [] garante que isso só rode uma vez

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentMessage.trim() && socketRef.current) {
      const messageToSend: ChatMessage = {
        autor: username,
        mensagem: currentMessage,
      };
      // Envia a mensagem para o "ouvido" do backend chamado 'chat_message'
      socketRef.current.emit('chat_message', messageToSend);
      setCurrentMessage(''); // Limpa a caixa de texto
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col p-4">
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-cyan-400">Ponto de Encontro</h1>
        <p className="text-sm text-gray-500">
          Status: <span className={isConnected ? 'text-green-500' : 'text-red-500'}>{isConnected ? 'Conectado' : 'Desconectado'}</span>
        </p>
      </div>

      {/* Área de exibição de mensagens */}
      <div className="flex-grow bg-gray-800 rounded-lg p-4 overflow-y-auto mb-4 border border-gray-700">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col items-start">
              <span className="text-cyan-400 text-sm font-bold">{msg.autor} <span className="text-gray-500 text-xs font-normal">{msg.timestamp}</span></span>
              <p className="bg-gray-700 rounded-lg px-3 py-2 mt-1">{msg.mensagem}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Formulário de envio de mensagem */}
      <form onSubmit={handleSendMessage} className="flex space-x-2">
        <Input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="bg-gray-700 border-gray-600 w-1/4"
          placeholder="Seu nome..."
        />
        <Input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          className="bg-gray-700 border-gray-600 w-3/4"
          placeholder="Digite sua mensagem..."
          autoComplete="off"
        />
        <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default PontoDeEncontroPage;