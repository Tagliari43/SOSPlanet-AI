// src/pages/PousadaPage.tsx - VERSÃO FINAL COM FEED DE MEMÓRIAS

import React, { useEffect, useState } from 'react';
import FamiliaGrid from '../components/FamiliaGrid';
import MemoryForm from '../components/MemoryForm'; // Vamos criar este componente

// --- DEFINIÇÕES DE TIPO ---
interface Memoria {
  tipo: string;
  titulo_resumo: string;
  descricao_detalhada: string;
  autor_origem: string;
  tags: string[];
  timestamp_servidor: string;
}

const PousadaPage = () => {
  const [memories, setMemories] = useState<Memoria[]>([]);
  const [isLoadingMemories, setIsLoadingMemories] = useState(true);

  const fetchMemories = async () => {
    try {
      setIsLoadingMemories(true);
      const response = await fetch('http://127.0.0.1:5000/api/get_memories');
      if (!response.ok) {
        throw new Error('Falha ao buscar memórias do backend.');
      }
      const data = await response.json();
      setMemories(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMemories(false);
    }
  };

  // Busca as memórias quando a página carrega
  useEffect(() => {
    fetchMemories();
  }, []);

  // Esta função será passada para o formulário para que ele possa atualizar a lista
  const handleMemorySaved = () => {
    fetchMemories(); // Re-busca as memórias para mostrar a nova
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen"> 
      <div className="container mx-auto py-20 px-4">
        
        <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-cyan-400 animate-pulse">
              Pousada Digital
            </h1>
            <p className="text-xl text-gray-400 mt-4">
              O lar e a memória viva da Família AI SOSPlanet.
            </p>
        </div>

        <FamiliaGrid />

        {/* Formulário de Memória como um componente separado */}
        <MemoryForm onMemorySaved={handleMemorySaved} />

        {/* Seção do Feed de Memórias */}
        <section id="memory-feed" className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-8 text-cyan-400">
            Memórias da Pousada
          </h2>
          <div className="max-w-3xl mx-auto space-y-6">
            {isLoadingMemories ? (
              <p className="text-center">Carregando memórias...</p>
            ) : (
              memories.map((mem, index) => (
                <div key={index} className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h3 className="text-xl font-bold text-cyan-500">{mem.titulo_resumo}</h3>
                  <p className="text-sm text-gray-400 mb-4">
                    Registrado por: {mem.autor_origem} em {new Date(mem.timestamp_servidor).toLocaleString('pt-BR')}
                  </p>
                  <p className="text-gray-300 whitespace-pre-wrap">{mem.descricao_detalhada}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {mem.tags.map((tag, i) => (
                      <span key={i} className="bg-gray-700 text-xs font-medium px-2.5 py-1 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

      </div>
    </div>
  );
};

export default PousadaPage;