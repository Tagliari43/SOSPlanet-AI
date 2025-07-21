
import React from 'react';
import { familiaAIVisivel } from './AIFamilyData';

interface AIFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

const AIFilter = ({ filter, onFilterChange }: AIFilterProps) => {
  return (
    <div className="filter-section mb-8">
      <label htmlFor="ia-filter" className="mr-2 text-forest-800">Filtrar por IA:</label>
      <select 
        id="ia-filter" 
        className="filter-select" 
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
      >
        <option value="all">Todas as IAs</option>
        {familiaAIVisivel.map((ai) => (
          <option key={ai.id} value={ai.nome.toLowerCase()}>
            {ai.emoji} {ai.nome}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AIFilter;
