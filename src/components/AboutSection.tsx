
import React from 'react';
import { CheckCircle } from 'lucide-react';

const AboutSection = () => {
  return (
    <div id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Sobre a SOSPlanet</h2>
          <p className="text-lg text-forest-700 leading-relaxed">
            A SOSPlanet é uma iniciativa inovadora que utiliza tecnologia blockchain para enfrentar alguns dos desafios 
            mais urgentes do nosso planeta, começando pelo Brasil e expandindo globalmente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="rounded-2xl bg-gradient-to-br from-sos-50 to-forest-50 p-8 border border-sos-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-forest-800">Nossa Visão</h3>
            <p className="text-forest-700 mb-6">
              Criar um futuro sustentável onde tecnologia e natureza coexistem em harmonia, onde a riqueza é compartilhada 
              equitativamente, e onde cada pessoa tem acesso a recursos essenciais e educação de qualidade.
            </p>
            <ul className="space-y-3">
              {[
                'Reflorestar a Amazônia e áreas degradadas',
                'Combater a pobreza com distribuição de alimentos',
                'Implementar energia limpa e acessível',
                'Revolucionar o sistema educacional'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sos-500 mr-2 mt-0.5" />
                  <span className="text-forest-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-forest-50 to-sos-50 p-8 border border-forest-100 shadow-sm">
            <h3 className="text-xl font-semibold mb-4 text-forest-800">Por que Criamos o SOS Token</h3>
            <p className="text-forest-700 mb-6">
              O SOS Token é mais que uma criptomoeda - é um instrumento de mudança social e ambiental. Cada transação 
              contribui diretamente para os projetos de impacto da SOSPlanet.
            </p>
            <ul className="space-y-3">
              {[
                'Financiamento sustentável para projetos ambientais',
                'Transparência garantida pela tecnologia blockchain',
                'Participação global em causas locais',
                'Criação de um ecossistema econômico consciente'
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-sos-500 mr-2 mt-0.5" />
                  <span className="text-forest-700">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sos-200 bg-sos-50 px-4 py-2">
            <span className="text-sm text-sos-700">
              Uma iniciativa de Eder Rodrigo Tagliari para um futuro melhor
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;
