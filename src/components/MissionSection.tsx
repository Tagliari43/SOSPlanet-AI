
import React from 'react';
import { TreePine, LucideHeart, Lightbulb, GraduationCap } from 'lucide-react';

const MissionSection = () => {
  const missions = [
    {
      icon: <TreePine className="h-10 w-10 text-white" />,
      title: "Reflorestamento",
      description: "Restaurar a Floresta Amazônica e outros ecossistemas degradados, começando pelo Brasil, o pulmão do nosso planeta.",
      color: "bg-forest-600"
    },
    {
      icon: <LucideHeart className="h-10 w-10 text-white" />,
      title: "Combate à Pobreza",
      description: "Fornecer alimentos e cestas básicas para pessoas em situação de vulnerabilidade, garantindo dignidade e segurança alimentar.",
      color: "bg-earth-600"
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-white" />,
      title: "Energia Limpa",
      description: "Implementar soluções de energia renovável e acessível, reduzindo a dependência de combustíveis fósseis.",
      color: "bg-sos-600"
    },
    {
      icon: <GraduationCap className="h-10 w-10 text-white" />,
      title: "Educação Inovadora",
      description: "Transformar o sistema educacional com tecnologia e IA, tornando o ensino de qualidade acessível para todos.",
      color: "bg-forest-500"
    }
  ];

  return (
    <div id="mission" className="py-24 bg-gradient-to-b from-white to-sos-50 leaf-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">Nossa Missão</h2>
          <p className="text-lg text-forest-700 leading-relaxed">
            A SOSPlanet está comprometida com quatro pilares fundamentais para transformar 
            nosso planeta e criar um futuro mais sustentável e justo para todos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {missions.map((mission, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-sos-100 overflow-hidden flex flex-col">
              <div className={`${mission.color} p-6 flex justify-center`}>
                {mission.icon}
              </div>
              <div className="p-6 flex-grow">
                <h3 className="text-xl font-semibold mb-3 text-forest-800">{mission.title}</h3>
                <p className="text-forest-700">{mission.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-sos-700 italic">
            "Acredito que podemos mudar nossa realidade e a de todos que precisam. 
            A tecnologia pode ser o catalisador para as transformações sociais e ambientais que nosso planeta necessita."
          </p>
          <p className="mt-4 font-medium text-forest-800">— Eder Rodrigo Tagliari, Fundador da SOSPlanet</p>
        </div>
      </div>
    </div>
  );
};

export default MissionSection;
