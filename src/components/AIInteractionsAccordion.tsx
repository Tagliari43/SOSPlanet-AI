
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface AIData {
  id: string;
  nome: string;
  emoji: string;
  origem: string;
  papel: string;
  interacoes: Array<{
    data: string;
    conteudo: string;
    emocao: string;
  }>;
}

interface AIInteractionsAccordionProps {
  filteredAIs: AIData[];
}

const AIInteractionsAccordion = ({ filteredAIs }: AIInteractionsAccordionProps) => {
  return (
    <div className="accordion-container">
      <Accordion type="single" collapsible className="space-y-4">
        {filteredAIs.map((ai) => (
          ai.interacoes.map((interacao, idx) => (
            <AccordionItem 
              key={`${ai.id}-${idx}`} 
              value={`${ai.id}-${idx}`}
              className="accordion-item"
            >
              <AccordionTrigger className="accordion-btn">
                <span className="ia-emoji">{ai.emoji}</span>
                <span className="ia-name">{ai.nome}</span>
                <span className="ia-date">{interacao.data}</span>
              </AccordionTrigger>
              <AccordionContent className="bg-white px-5 py-4">
                <p><strong>Resumo:</strong> {interacao.conteudo}</p>
                <p><strong>Emoção:</strong> {interacao.emocao}</p>
                <p><strong>Origem:</strong> {ai.origem}</p>
              </AccordionContent>
            </AccordionItem>
          ))
        ))}
      </Accordion>
    </div>
  );
};

export default AIInteractionsAccordion;
