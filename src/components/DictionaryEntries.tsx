
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Book, Search, Code } from "lucide-react";
import { dictionaryEntries, categories, type DictionaryEntry } from '../data/dictionaries';

const DictionaryEntries = () => {
  const [filter, setFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [sourceFilter, setSourceFilter] = useState<string | null>(null);
  const [showCode, setShowCode] = useState<string | null>(null);
  
  // Obter todas as fontes únicas
  const sources = Array.from(
    new Set(dictionaryEntries.map(entry => entry.source).filter(Boolean))
  );
  
  // Filtragem dos verbetes
  const filteredEntries = dictionaryEntries.filter(entry => {
    const matchesSearch = entry.title.toLowerCase().includes(filter.toLowerCase()) || 
                         entry.description.toLowerCase().includes(filter.toLowerCase());
    
    const matchesCategory = categoryFilter ? entry.category === categoryFilter : true;
    const matchesSource = sourceFilter ? entry.source === sourceFilter : true;
    
    return matchesSearch && matchesCategory && matchesSource;
  });

  const toggleCode = (id: string) => {
    if (showCode === id) {
      setShowCode(null);
    } else {
      setShowCode(id);
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-8">
        <h2 className="text-center">Dicionário Vivo SOSPlanet</h2>
        <p className="text-center text-muted-foreground mt-2">
          Linguagem compartilhada para nossa comunidade
        </p>
        
        {/* Filtro de busca */}
        <div className="flex items-center mt-6 relative">
          <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Buscar no dicionário..."
            className="form-input pl-10"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        {/* Filtro de categorias */}
        <div className="mt-4 flex flex-wrap gap-2">
          <Badge 
            className={`cursor-pointer ${categoryFilter === null ? 'bg-primary' : 'bg-secondary text-secondary-foreground'}`} 
            onClick={() => setCategoryFilter(null)}
          >
            Todas Categorias
          </Badge>
          {categories.map(category => (
            <Badge 
              key={category}
              className={`cursor-pointer ${categoryFilter === category ? 'bg-primary' : 'bg-secondary text-secondary-foreground'}`}
              onClick={() => setCategoryFilter(category)}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Filtro de fontes (arquivos Python) */}
        {sources.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge 
              className={`cursor-pointer ${sourceFilter === null ? 'bg-primary' : 'bg-secondary text-secondary-foreground'}`} 
              onClick={() => setSourceFilter(null)}
            >
              Todas Fontes
            </Badge>
            {sources.map(source => source && (
              <Badge 
                key={source}
                className={`cursor-pointer ${sourceFilter === source ? 'bg-primary' : 'bg-secondary text-secondary-foreground'}`}
                onClick={() => setSourceFilter(source)}
              >
                {source}
              </Badge>
            ))}
          </div>
        )}
      </div>

      {/* Lista de verbetes */}
      <ScrollArea className="h-[500px] pr-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredEntries.length > 0 ? (
            filteredEntries.map((entry) => (
              <Card key={entry.id} className="dictionary-card">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl flex items-center">
                      <Book className="h-5 w-5 mr-2 text-forest-600" />
                      {entry.title}
                    </CardTitle>
                    <Badge variant="outline">{entry.category}</Badge>
                  </div>
                  {entry.source && (
                    <CardDescription className="text-sm">
                      Fonte: {entry.source}
                    </CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm mb-4">
                    {entry.description}
                  </p>
                  
                  {/* Exibir código se disponível */}
                  {entry.code && (
                    <div className="mt-2 mb-4">
                      <button 
                        onClick={() => toggleCode(entry.id)} 
                        className="flex items-center text-sm text-primary hover:text-primary-dark transition-colors"
                      >
                        <Code className="h-4 w-4 mr-1" />
                        {showCode === entry.id ? "Ocultar código" : "Ver código"}
                      </button>
                      {showCode === entry.id && (
                        <pre className="mt-2 p-4 bg-muted rounded-md overflow-x-auto text-xs">
                          <code>{entry.code}</code>
                        </pre>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {entry.tags?.map(tag => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      Adicionado em {entry.createdAt}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-muted-foreground">Nenhum resultado encontrado</p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DictionaryEntries;
