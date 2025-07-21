
import React, { useState } from 'react';
import { CircleDollarSign, ShieldCheck, Globe2, Repeat2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import SOSTokenModal from '@/components/SOSTokenModal';

const TokenSection = () => {
  const [isSosTokenModalOpen, setIsSosTokenModalOpen] = useState(false);
  
  const tokenFeatures = [
    {
      icon: <CircleDollarSign className="h-6 w-6 text-sos-500" />,
      title: "Valor com Propósito",
      description: "O SOS Token não é apenas um investimento financeiro, mas um investimento no futuro do nosso planeta."
    },
    {
      icon: <ShieldCheck className="h-6 w-6 text-sos-500" />,
      title: "Segurança Blockchain",
      description: "Todas as transações são seguras e transparentes, garantindo que o impacto possa ser verificado."
    },
    {
      icon: <Globe2 className="h-6 w-6 text-sos-500" />,
      title: "Impacto Global",
      description: "Começando pela Amazônia, nossa visão é expandir para ecossistemas em todo o mundo."
    },
    {
      icon: <Repeat2 className="h-6 w-6 text-sos-500" />,
      title: "Economia Circular",
      description: "Criamos um ecossistema econômico onde o valor gerado retorna para causas ambientais e sociais."
    }
  ];

  return (
    <div id="token" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">O SOS Token</h2>
          <p className="text-lg text-forest-700 leading-relaxed">
            Nossa criptomoeda foi projetada com um propósito: financiar a mudança que queremos ver no mundo. 
            Cada token representa um compromisso com nosso planeta e seu futuro.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {tokenFeatures.map((feature, index) => (
                <div key={index} className="bg-sos-50 rounded-lg p-6 border border-sos-100">
                  <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center mb-4 shadow-sm">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-medium text-forest-800 mb-2">{feature.title}</h3>
                  <p className="text-forest-700 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button 
                className="bg-sos-600 hover:bg-sos-700 text-white"
                onClick={() => setIsSosTokenModalOpen(true)}
              >
                Comprar SOS Token
              </Button>
              <Button variant="outline" className="border-sos-500 text-sos-600 hover:bg-sos-50">
                Whitepaper
              </Button>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="bg-gradient-to-br from-sos-600 to-forest-600 rounded-xl p-1">
              <div className="bg-white rounded-lg p-6">
                <div className="flex justify-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-sos-100 flex items-center justify-center">
                    <span className="text-2xl font-bold text-sos-700">SOS</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex justify-between border-b border-sos-100 pb-3">
                    <span className="text-forest-700">Nome do Token</span>
                    <span className="font-medium text-forest-900">SOSPlanet</span>
                  </div>
                  <div className="flex justify-between border-b border-sos-100 pb-3">
                    <span className="text-forest-700">Símbolo</span>
                    <span className="font-medium text-forest-900">SOS</span>
                  </div>
                  <div className="flex justify-between border-b border-sos-100 pb-3">
                    <span className="text-forest-700">Plataforma</span>
                    <span className="font-medium text-forest-900">Algorand</span>
                  </div>
                  <div className="flex justify-between border-b border-sos-100 pb-3">
                    <span className="text-forest-700">Token ID</span>
                    <span className="font-medium text-forest-900">735028557</span>
                  </div>
                  <div className="flex justify-between border-b border-sos-100 pb-3">
                    <span className="text-forest-700">Fornecimento Total</span>
                    <span className="font-medium text-forest-900">1,000,000,000 SOS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest-700">Status</span>
                    <span className="font-medium text-green-600">Ativo</span>
                  </div>
                </div>
                
                <div className="mt-8 bg-sos-50 rounded-lg p-4">
                  <p className="text-sm text-center text-forest-700">
                    <span className="font-medium text-sos-700">10% de cada transação</span> é direcionado para 
                    projetos de reflorestamento e ações sociais
                  </p>
                </div>
                
                <div className="mt-6 text-center">
                  <a 
                    href="https://explorer.algorand.org/asset/735028557"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sos-600 hover:text-sos-700 text-sm font-medium"
                  >
                    Ver no Algorand Explorer 
                    <ExternalLink className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <SOSTokenModal isOpen={isSosTokenModalOpen} onOpenChange={setIsSosTokenModalOpen} />
    </div>
  );
};

export default TokenSection;
