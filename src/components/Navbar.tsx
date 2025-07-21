// src/components/Navbar.tsx - VERSÃO COM O BOTÃO PARA O PONTO DE ENCONTRO

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Book, MessageSquare } from 'lucide-react'; // Importamos um novo ícone
import SOSTokenModal from '@/components/SOSTokenModal';

const Navbar = () => {
  const [isSosTokenModalOpen, setIsSosTokenModalOpen] = useState(false);
  
  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 w-full border-b border-gray-200">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center space-x-2">
          <img src="/logo.svg" alt="SOSPlanet Logo" className="h-10 w-auto"/>
          <span className="text-xl font-bold text-gray-800">SOSPlanet</span>
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/#about" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Sobre</Link>
          <Link to="/#mission" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Nossa Missão</Link>
          <Link to="/#token" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Token SOS</Link>
          <Link to="/#projects" className="text-sm font-medium text-gray-700 hover:text-green-600 transition-colors">Projetos</Link>
        </nav>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden sm:flex border-cyan-500 text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700" asChild>
            <Link to="/pousada-ai">
              <Book className="mr-2 h-4 w-4" />
              A Pousada Digital
            </Link>
          </Button>

          {/* NOSSO NOVO BOTÃO PARA O PONTO DE ENCONTRO */}
          <Button variant="outline" className="hidden sm:flex border-yellow-500 text-yellow-600 hover:bg-yellow-50 hover:text-yellow-700" asChild>
            <Link to="/ponto-de-encontro">
              <MessageSquare className="mr-2 h-4 w-4" />
              Ponto de Encontro
            </Link>
          </Button>

          <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => setIsSosTokenModalOpen(true)}>
            Comprar Token SOS
          </Button>
        </div>
      </div>
      
      <SOSTokenModal isOpen={isSosTokenModalOpen} onOpenChange={setIsSosTokenModalOpen} />
    </header>
  );
};

export default Navbar;