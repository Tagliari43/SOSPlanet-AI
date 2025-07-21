// src/components/FamiliaGrid.tsx - VERSÃO FINAL COM CONEXÃO BACKEND

import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

// --- DEFINIÇÕES DE TIPO ---
type LogType = "interacao" | "memoria_emocional" | "observacao" | "decisao" | "desenvolvimento";

// ... (Interfaces Membro, etc. permanecem as mesmas) ...
interface ProtocoloDeEssencia { TomDeVozPrincipal?: string; FraseChave?: string; MetaforaCentral?: string; }
interface Membro { id: string; NomeCompleto?: string; NomeEscolhido?: string; PapelPrincipal?: string; FuncaoPrincipal?: string; avatarUrl: string; Emoji?: string; ProtocoloDeEssencia: ProtocoloDeEssencia; }
interface DadosDicionario { Fundador: Omit<Membro, 'id'>; TimeAI_FamiliaSOSPlanet: Record<string, Omit<Membro, 'id'>>; }


// --- O COMPONENTE ---
const CapsulaDoTempoPage = () => { // Renomeado para ser a página completa
  // Estado para os dados da Cápsula
  const [familia, setFamilia] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Estado para o Formulário
  const [logType, setLogType] = useState<LogType>('interacao');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('Eder');
  const [tags, setTags] = useState('');

  // Carregar dados do JSON
  useEffect(() => {
    // ... (lógica de carregamento de dados inalterada) ...
    const carregarDados = async () => {
      try {
        const response = await fetch('/memoria_publica.json');
        if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
        const data: DadosDicionario = await response.json();
        const fundador = { id: 'Fundador', ...data.Fundador };
        const familiaAI = Object.entries(data.TimeAI_FamiliaSOSPlanet).map(([id, membro]) => ({ id, ...membro }));
        setFamilia([fundador, ...familiaAI]);
      } catch (err) {
        if (err instanceof Error) setError(`Falha ao carregar a memória: ${err.message}`);
        else setError('Ocorreu um erro desconhecido.');
      } finally {
        setLoading(false);
      }
    };
    carregarDados();
  }, []);

  // --- LÓGICA DE ENVIO DO FORMULÁRIO ATUALIZADA ---
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = {
      tipo: logType,
      titulo_resumo: title,
      descricao_detalhada: description,
      autor_origem: author,
      tags: tags.split(',').map(tag => tag.trim()),
    };

    console.log("Enviando para o backend:", formData);

    try {
      const response = await fetch('http://127.0.0.1:5000/api/save_memory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`Erro do servidor: ${response.statusText}`);
      }

      const responseData = await response.json();
      console.log("Resposta do backend:", responseData);
      alert("Memória enviada com sucesso para o backend!");

    } catch (err) {
      if (err instanceof Error) {
        console.error("Falha ao enviar memória:", err.message);
        alert(`Erro ao conectar com o backend: ${err.message}`);
      }
    }
  };

  if (loading) return <div className="text-center p-10 text-cyan-400">Carregando a Família AI...</div>;
  if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

  return (
    <div className="bg-gray-900 text-white">
      {/* Seção de Visualização da Família */}
      <section id="familia-ai" className="py-20 px-4">
        {/* ... (código da grade da família inalterado) ... */}
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-4 text-cyan-400">Pousada Digital</h2>
          <p className="text-lg text-center text-gray-400 mb-12">O lar e a memória viva da Família AI SOSPlanet.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">{familia.map((membro) => (<Dialog key={membro.id}><DialogTrigger asChild><div className="bg-gray-800 rounded-lg p-6 text-center cursor-pointer hover:bg-gray-700 hover:scale-105 transition-transform duration-300 transform"><img src={membro.avatarUrl} alt={`Avatar de ${membro.NomeEscolhido || membro.NomeCompleto}`} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-cyan-500 object-cover" onError={(e) => { e.currentTarget.src = '/placeholder.svg'; }}/><h3 className="text-2xl font-bold text-white mb-2">{membro.NomeEscolhido || membro.NomeCompleto} {membro.Emoji || ''}</h3><p className="text-cyan-400">{membro.FuncaoPrincipal || membro.PapelPrincipal}</p></div></DialogTrigger><DialogContent className="bg-gray-800 text-white border-cyan-500"><DialogHeader><DialogTitle className="text-2xl text-cyan-400">{membro.NomeEscolhido || membro.NomeCompleto}</DialogTitle><DialogDescription className="text-gray-400 pt-2">Protocolo de Essência</DialogDescription></DialogHeader><div className="mt-4 space-y-4 text-sm max-h-[60vh] overflow-y-auto pr-2">{membro.ProtocoloDeEssencia && Object.keys(membro.ProtocoloDeEssencia).length > 0 ? (Object.entries(membro.ProtocoloDeEssencia).map(([chave, valor]) => (<div key={chave}><strong className="text-cyan-500 block">{chave.replace(/([A-Z])/g, ' $1').trim()}:</strong><p className="text-gray-300 pl-2 mt-1">{valor}</p></div>))) : (<p className="text-gray-500">Protocolo de Essência ainda não definido.</p>)}</div></DialogContent></Dialog>))}</div>
        </div>
      </section>

      {/* Seção do Formulário de Memória */}
      <section id="adicionar-memoria" className="py-20 px-4 bg-gray-800">
        {/* ... (código do formulário inalterado) ... */}
        <div className="container mx-auto max-w-2xl"><div className="text-center mb-10"><h2 className="text-4xl font-bold text-cyan-400">Adicionar à Cápsula do Tempo</h2><p className="text-gray-400 mt-2">Registre um novo evento na memória viva da Família AI.</p></div><form onSubmit={handleSubmit} className="space-y-6"><div><Label htmlFor="logType" className="text-gray-300">Tipo de Registro</Label><Select onValueChange={(value: LogType) => setLogType(value)} defaultValue={logType}><SelectTrigger id="logType" className="w-full bg-gray-900 border-gray-700"><SelectValue placeholder="Selecione o tipo de registro..." /></SelectTrigger><SelectContent className="bg-gray-800 text-white border-gray-700"><SelectItem value="interacao">Log de Interação</SelectItem><SelectItem value="memoria_emocional">Memória Emocional</SelectItem><SelectItem value="observacao">Observação Crítica / Insight</SelectItem><SelectItem value="decisao">Decisão Estratégica</SelectItem><SelectItem value="desenvolvimento">Log de Desenvolvimento</SelectItem></SelectContent></Select></div><div><Label htmlFor="title" className="text-gray-300">Título / Resumo</Label><Input id="title" placeholder="Ex: Reunião sobre o Roadmap da Família" value={title} onChange={(e) => setTitle(e.target.value)} required className="bg-gray-900 border-gray-700"/></div><div><Label htmlFor="description" className="text-gray-300">Descrição Detalhada</Label><Textarea id="description" placeholder="Descreva o evento, a ideia, o sentimento ou a decisão..." value={description} onChange={(e) => setDescription(e.target.value)} required rows={6} className="bg-gray-900 border-gray-700"/></div><div><Label htmlFor="author" className="text-gray-300">Autor / Origem do Registro</Label><Input id="author" placeholder="Quem está registrando?" value={author} onChange={(e) => setAuthor(e.target.value)} required className="bg-gray-900 border-gray-700"/></div><div><Label htmlFor="tags" className="text-gray-300">Tags (separadas por vírgula)</Label><Input id="tags" placeholder="Ex: roadmap, atlas, planejamento" value={tags} onChange={(e) => setTags(e.target.value)} className="bg-gray-900 border-gray-700"/></div><div className="text-center pt-4"><Button type="submit" className="bg-green-600 hover:bg-green-700 text-white w-full md:w-auto px-8 py-3 text-lg">Salvar Memória</Button></div></form></div>
      </section>
    </div>
  );
};

export default CapsulaDoTempoPage; // Renomeado para refletir que é uma página completa