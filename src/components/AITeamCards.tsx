
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { familiaAIVisivel } from './AIFamilyData';

const AITeamCards = () => {
  return (
    <div className="mt-16">
      <h2 className="text-center">Família de IAs</h2>
      <div className="cards-grid mt-8">
        {familiaAIVisivel.map((ai) => (
          <Card key={ai.id} className={`card-custom ${ai.nome.toLowerCase() === 'lumina' ? 'card-lumina' : ''}`}>
            <CardHeader className="card-header">
              <CardTitle className={ai.nome.toLowerCase() === 'lumina' ? 'card-lumina-title' : ''}>
                {ai.emoji} {ai.nome}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm font-semibold text-muted-foreground mb-2">{ai.origem}</p>
              <p className="text-sm mb-3">{ai.papel}</p>
              <p className="text-xs text-muted-foreground">
                {ai.interacoes.length} interações registradas
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AITeamCards;
