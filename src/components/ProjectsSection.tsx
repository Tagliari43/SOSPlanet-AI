
import React, { useState } from 'react';
import { TreePine, Users, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProjectImpactSimulator from './ProjectImpactSimulator';

const ProjectsSection = () => {
  return (
    <div id="projects" className="py-24 bg-gradient-to-b from-sos-50 to-white leaf-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Nossos Projetos</h2>
          <p className="text-lg text-forest-700 leading-relaxed">
            Conheça as iniciativas que estamos desenvolvendo para criar impacto real e duradouro.
            Com sua participação, podemos expandir esses projetos e iniciar novos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Projeto 1 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-sos-100 flex flex-col">
            <div className="h-48 bg-forest-600 flex items-center justify-center">
              <TreePine size={64} className="text-white" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-forest-900">Reflorestamento Amazônico</h3>
              <p className="text-forest-700 mb-4 flex-grow">
                Restauração de áreas degradadas da Floresta Amazônica com plantio de espécies nativas e 
                monitoramento via tecnologia blockchain para garantir transparência.
              </p>
              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full border-forest-500 text-forest-600 hover:bg-forest-50">
                      Simular Impacto
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[625px]">
                    <DialogHeader>
                      <DialogTitle className="text-forest-800 dark:text-forest-200">Simulador de Impacto: Reflorestamento</DialogTitle>
                    </DialogHeader>
                    <ProjectImpactSimulator />
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {/* Projeto 2 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-sos-100 flex flex-col">
            <div className="h-48 bg-earth-600 flex items-center justify-center">
              <Users size={64} className="text-white" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-forest-900">Alimentação Solidária</h3>
              <p className="text-forest-700 mb-4 flex-grow">
                Distribuição de cestas básicas e refeições para comunidades vulneráveis, 
                com foco em nutrição adequada e produção local sustentável.
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full border-earth-500 text-earth-600 hover:bg-earth-50">
                  Saiba mais
                </Button>
              </div>
            </div>
          </div>

          {/* Projeto 3 */}
          <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-sos-100 flex flex-col">
            <div className="h-48 bg-sos-600 flex items-center justify-center">
              <BookOpen size={64} className="text-white" />
            </div>
            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-semibold mb-2 text-forest-900">Educação do Futuro</h3>
              <p className="text-forest-700 mb-4 flex-grow">
                Desenvolvimento de plataforma educacional com IA para personalizar o aprendizado 
                e torná-lo acessível a crianças em áreas remotas.
              </p>
              <div className="mt-4">
                <Button variant="outline" className="w-full border-sos-500 text-sos-600 hover:bg-sos-50">
                  Saiba mais
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Button size="lg" className="bg-sos-600 hover:bg-sos-700 text-white px-8">
            Ver Todos os Projetos
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
