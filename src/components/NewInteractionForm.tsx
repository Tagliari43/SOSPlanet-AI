
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { emotionOptions } from './AIFamilyData';

const NewInteractionForm = () => {
  return (
    <Card className="form-card mb-10">
      <CardHeader>
        <CardTitle className="text-center text-forest-800">🤖 Nova Interação com IA</CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-4">
          <div className="form-group">
            <label htmlFor="ia" className="form-label">Nome da IA:</label>
            <input type="text" id="ia" name="ia" className="form-input" required />
          </div>

          <div className="form-group">
            <label htmlFor="resumo" className="form-label">O que foi produzido:</label>
            <textarea id="resumo" name="resumo" className="form-textarea" required />
          </div>

          <div className="form-group">
            <label htmlFor="emocao" className="form-label">Emoção:</label>
            <select id="emocao" name="emocao" className="form-input">
              {emotionOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <Button className="submit-button">Salvar Interação</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewInteractionForm;
