
import React from 'react';
import { Leaf, Mail, Github, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

const FooterSection = () => {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-4">
            <div className="flex items-center space-x-2 mb-4">
              <Leaf className="h-8 w-8 text-sos-400" />
              <span className="text-2xl font-bold text-white">SOSPlanet</span>
            </div>
            <p className="text-forest-200 mb-6 max-w-md">
              Usando tecnologia blockchain para criar um planeta mais verde, justo e sustentável para as futuras gerações.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-forest-300 hover:text-sos-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-forest-300 hover:text-sos-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-forest-300 hover:text-sos-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-forest-300 hover:text-sos-400 transition-colors">
                <Github size={20} />
              </a>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">SOSPlanet</h3>
            <ul className="space-y-3">
              <li><Link to="/#about" className="text-forest-300 hover:text-white transition-colors">Sobre</Link></li>
              <li><Link to="/#mission" className="text-forest-300 hover:text-white transition-colors">Nossa Missão</Link></li>
              <li><Link to="/#token" className="text-forest-300 hover:text-white transition-colors">SOS Token</Link></li>
              <li><Link to="/#projects" className="text-forest-300 hover:text-white transition-colors">Projetos</Link></li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-lg font-semibold mb-4">Recursos</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-forest-300 hover:text-white transition-colors">Whitepaper</a></li>
              <li><a href="#" className="text-forest-300 hover:text-white transition-colors">Documentação</a></li>
              <li><a href="#" className="text-forest-300 hover:text-white transition-colors">Roadmap</a></li>
              <li><a href="#" className="text-forest-300 hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div className="md:col-span-4">
            <h3 className="text-lg font-semibold mb-4">Inscreva-se</h3>
            <p className="text-forest-300 mb-4">Receba atualizações sobre o lançamento do token e nossas iniciativas.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Seu e-mail" 
                className="py-2 px-4 rounded-l-md flex-grow bg-forest-800 text-white border border-forest-700 focus:outline-none focus:border-sos-500"
              />
              <button type="submit" className="bg-sos-600 hover:bg-sos-700 text-white px-4 py-2 rounded-r-md transition-colors">
                <Mail size={20} />
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-forest-800 text-center">
          <p className="text-forest-400 text-sm">
            &copy; {new Date().getFullYear()} SOSPlanet. Todos os direitos reservados. Criado por Eder Rodrigo Tagliari.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
