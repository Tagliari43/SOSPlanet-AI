
import React from 'react';
import { ArrowRight, TreePine, Cloud, Sparkles, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-white to-sos-50 leaf-pattern">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 opacity-60 animate-float">
        <TreePine size={40} className="text-forest-400" />
      </div>
      <div className="absolute top-40 right-10 opacity-40 animate-float" style={{ animationDelay: "1.5s" }}>
        <Cloud size={50} className="text-sos-300" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-60 animate-float" style={{ animationDelay: "2s" }}>
        <Leaf size={30} className="text-sos-500" />
      </div>
      <div className="absolute bottom-40 right-20 opacity-50 animate-float" style={{ animationDelay: "1s" }}>
        <Sparkles size={24} className="text-forest-500" />
      </div>
      
      <div className="container px-4 py-24 md:py-32 mx-auto">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center rounded-full border border-sos-200 bg-white px-4 py-1.5 text-sm text-sos-600 mb-8">
            <span className="flex h-2 w-2 rounded-full bg-sos-500 mr-2"></span>
            Lançando em breve - SOS Token
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-forest-950 mb-6">
            <span className="gradient-text">SOSPlanet</span> - Salvando o Planeta
            <br />com Blockchain
          </h1>
          
          <p className="max-w-2xl text-forest-700 text-lg md:text-xl mb-10 leading-relaxed">
            Uma plataforma revolucionária que usa criptomoeda para reflorestar a Amazônia, reduzir a pobreza, 
            implementar energia limpa e revolucionar a educação.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
            <Button size="lg" className="bg-sos-600 hover:bg-sos-700 text-white font-medium px-8 py-6">
              Participe do Movimento
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="border-sos-500 text-sos-600 hover:bg-sos-50 font-medium px-8 py-6">
              Saiba Mais
            </Button>
          </div>
          
          <div className="mt-16 flex flex-col md:flex-row gap-8 justify-center items-center text-center">
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-forest-100 p-3 mb-3">
                <TreePine className="h-6 w-6 text-forest-600" />
              </div>
              <h3 className="font-medium text-forest-900">Reflorestamento</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-earth-100 p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-earth-600">
                  <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                  <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                  <line x1="6" y1="1" x2="6" y2="4"></line>
                  <line x1="10" y1="1" x2="10" y2="4"></line>
                  <line x1="14" y1="1" x2="14" y2="4"></line>
                </svg>
              </div>
              <h3 className="font-medium text-forest-900">Combate à Pobreza</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-sos-100 p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-sos-600">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              </div>
              <h3 className="font-medium text-forest-900">Energia Limpa</h3>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="rounded-full bg-forest-100 p-3 mb-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-forest-600">
                  <path d="M3 19V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"></path>
                  <path d="M3 9h18"></path>
                  <path d="M14 17h2"></path>
                  <path d="M8 17h2"></path>
                </svg>
              </div>
              <h3 className="font-medium text-forest-900">Educação</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
