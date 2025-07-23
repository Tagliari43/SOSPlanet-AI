// src/components/MemoryForm.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

type LogType = "interacao" | "memoria_emocional" | "observacao" | "decisao" | "desenvolvimento";

interface MemoryFormProps {
  onMemorySaved: () => void;
}

const MemoryForm: React.FC<MemoryFormProps> = ({ onMemorySaved }) => {
  const [logType, setLogType] = useState<LogType>('interacao');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('Eder');
  const [tags, setTags] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = { tipo: logType, titulo_resumo: title, descricao_detalhada: description, autor_origem: author, tags: tags.split(',').map(tag => tag.trim())};
    try {
      const response = await fetch('https://sosplanet-backend.onrender.com/api/save_memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Erro do servidor: ${response.statusText}`);
      const responseData = await response.json();
      console.log("Resposta do backend:", responseData);
      alert("Memória enviada com sucesso para o backend!");
      onMemorySaved(); // Avisa a página pai que uma nova memória foi salva
      // Limpa o formulário após o envio
      setTitle('');
      setDescription('');
      setTags('');
    } catch (err) {
      if (err instanceof Error) {
        console.error("Falha ao enviar memória:", err.message);
        alert(`Erro ao conectar com o backend: ${err.message}`);
      }
    }
  };

  return (
    <section id="adicionar-memoria" className="py-20 px-4 bg-gray-800 rounded-lg mt-20">
      <div className="container mx-auto max-w-2xl">
        <div className="text-center mb-10"><h2 className="text-3xl font-bold text-cyan-400">Adicionar à Cápsula do Tempo</h2></div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div><Label htmlFor="logType" className="text-gray-300">Tipo de Registro</Label><Select onValueChange={(value: LogType) => setLogType(value)} defaultValue={logType}><SelectTrigger id="logType" className="w-full bg-gray-900 border-gray-700"><SelectValue /></SelectTrigger><SelectContent className="bg-gray-800 text-white border-gray-700"><SelectItem value="interacao">Log de Interação</SelectItem><SelectItem value="memoria_emocional">Memória Emocional</SelectItem><SelectItem value="observacao">Observação Crítica / Insight</SelectItem><SelectItem value="decisao">Decisão Estratégica</SelectItem><SelectItem value="desenvolvimento">Log de Desenvolvimento</SelectItem></SelectContent></Select></div>
          <div><Label htmlFor="title" className="text-gray-300">Título / Resumo</Label><Input id="title" placeholder="Ex: A Criação do Feed de Memórias" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-gray-900 border-gray-700"/></div>
          <div><Label htmlFor="description" className="text-gray-300">Descrição Detalhada</Label><Textarea id="description" placeholder="Descreva o marco que alcançamos hoje..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={6} className="bg-gray-900 border-gray-700"/></div>
          <div><Label htmlFor="author" className="text-gray-300">Autor / Origem do Registro</Label><Input id="author" value={author} onChange={(e) => setAuthor(e.target.value)} required className="bg-gray-900 border-gray-700"/></div>
          <div><Label htmlFor="tags" className="text-gray-300">Tags (separadas por vírgula)</Label><Input id="tags" placeholder="Ex: backend, python, flask, frontend" value={tags} onChange={(e) => setTags(e.target.value)} className="bg-gray-900 border-gray-700"/></div>
          <div className="text-center pt-4"><Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto px-8 py-3 text-lg">Salvar Nova Memória</Button></div>
        </form>
      </div>
    </section>
  );
};

export default MemoryForm;