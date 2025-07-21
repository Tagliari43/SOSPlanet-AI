
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Book } from 'lucide-react';
import { familiaAIVisivel } from './AIFamilyData';
import NewInteractionForm from './NewInteractionForm';
import AIFilter from './AIFilter';
import AIInteractionsAccordion from './AIInteractionsAccordion';
import AITeamCards from './AITeamCards';

const DictionarySection = () => {
  const [filter, setFilter] = useState("all");

  const filteredAIs = filter === "all" 
    ? familiaAIVisivel 
    : familiaAIVisivel.filter(ai => ai.nome.toLowerCase() === filter.toLowerCase());

  return (
    <div className="py-12 bg-background leaf-pattern">
      <div className="container-custom">
        <div className="mb-12 text-center">
          <h1>📚 SOSPlanet Dicionário Vivo</h1>
          <p className="text-forest-700 text-lg mt-4">Acompanhe as interações e avanços de nossa família de IAs</p>
          <div className="mt-4">
            <Button variant="outline" className="border-forest-500 text-forest-600 hover:bg-forest-50" asChild>
              <Link to="/dictionary/manage">
                <Book className="mr-2 h-4 w-4" />
                Gerenciar Dicionário Completo
              </Link>
            </Button>
          </div>
        </div>

        <NewInteractionForm />
        <AIFilter filter={filter} onFilterChange={setFilter} />
        <AIInteractionsAccordion filteredAIs={filteredAIs} />
        <AITeamCards />
      </div>
    </div>
  );
};

export default DictionarySection;
