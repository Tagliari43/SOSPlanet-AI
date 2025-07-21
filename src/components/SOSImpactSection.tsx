
import React from 'react';

export default function SOSImpactSection() {
  return (
    <div className="mt-6 p-4 bg-sos-50 dark:bg-sos-900/30 border border-t border-sos-200 dark:border-sos-700 rounded-lg shadow-sm w-full">
      <h4 className="font-semibold text-sos-700 dark:text-sos-300 mb-3 text-center text-sm">
        🌍 Nosso Impacto (Juntos Fazemos Acontecer!)
      </h4>
      <div className="flex justify-around text-center">
        <div>
          <p className="text-xl font-bold text-forest-700 dark:text-forest-300">5,000+</p>
          <p className="text-xs text-muted-foreground">Árvores Plantadas</p>
        </div>
        <div>
          <p className="text-xl font-bold text-forest-700 dark:text-forest-300">2,500+</p>
          <p className="text-xs text-muted-foreground">Refeições Doadas</p>
        </div>
        <div>
          <p className="text-xl font-bold text-forest-700 dark:text-forest-300">100+</p>
          <p className="text-xs text-muted-foreground">Projetos Apoiados</p>
        </div>
      </div>
      <p className="text-xxs text-center mt-3 italic text-muted-foreground">(Valores representam nossas metas e o impacto que buscamos. Acompanhe nosso progresso real!)</p>
    </div>
  );
}
