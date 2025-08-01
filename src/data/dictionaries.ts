export interface DictionaryEntry {
  id: string;
  title: string;
  description: string;
  category: string;
  createdAt: string;
  source?: string;
  code?: string;
  tags?: string[];
}

// Dados do dicionário
export let dictionaryEntries: DictionaryEntry[] = [
  {
    id: "painel-administrador-guardioes",
    title: "Painel de Administrador (Guardiões)",
    description: "Uma futura página de administração para visualizar e gerenciar os 'Guardiões da Terra' (inscritos). Esta interface permitirá o acompanhamento em tempo real do crescimento da comunidade, listando todos os e-mails cadastrados no banco de dados da Vercel Postgres. Este é um passo planejado para a gestão da plataforma.",
    category: "Governança",
    createdAt: "2024-05-24",
    source: "app/admin/subscribers/page.tsx (Planejado)",
    tags: ["Administração", "Gestão", "Comunidade", "Prisma", "Next.js", "Planejamento"],
    code: `// app/admin/subscribers/page.tsx (Planejado)
import { PrismaClient } from '@prisma/client';
// ... imports da UI ...

async function getSubscribers() { /* ... busca no prisma ... */ }

export default async function SubscribersAdminPage() { /* ... JSX para renderizar a tabela ... */ }`
  },
  {
    id: "simulador-de-impacto-de-projetos",
    title: "Simulador de Impacto de Projetos",
    description: "Um componente interativo em React (TypeScript) que traduz a lógica do BioSimulator para a interface do usuário. Permite aos usuários ajustar parâmetros ambientais (temperatura, chuva, etc.) e visualizar em tempo real o impacto no crescimento e saúde de uma muda, engajando e educando sobre a importância das condições climáticas para o reflorestamento.",
    category: "Tecnologia",
    createdAt: "2024-05-24",
    source: "ProjectImpactSimulator.tsx",
    tags: ["React", "TypeScript", "Simulação", "UI", "Engajamento"],
    code: `// src/components/ProjectImpactSimulator.tsx
const ProjectImpactSimulator: React.FC = () => {
  // ... (estados e lógica de simulação) ...
  const simulationResult = useMemo<SimulationResult>(() => { /* ... */ }, [params]);
  return ( /* ... JSX para renderização dos sliders e resultados ... */ );
};`
  },
  {
    id: "acordo-convivencia",
    title: "Acordo de Convivência",
    description: "Conjunto de princípios e regras estabelecidas coletivamente para guiar as interações em um grupo ou comunidade, promovendo o respeito, a harmonia e a colaboração.",
    category: "Governança",
    createdAt: "2024-03-15"
  },
  {
    id: "acao-coletiva",
    title: "Ação Coletiva",
    description: "Esforço conjunto de um grupo de pessoas para alcançar um objetivo comum, como a defesa de direitos, a promoção de mudanças sociais ou a resolução de problemas comunitários.",
    category: "Engajamento",
    createdAt: "2024-03-15"
  },
  {
    id: "ativismo-digital",
    title: "Ativismo Digital",
    description: "Utilização de ferramentas e plataformas online para promover causas sociais, políticas ou ambientais, mobilizar apoio, conscientizar o público e influenciar tomadas de decisão.",
    category: "Engajamento",
    createdAt: "2024-03-15"
  },
  {
    id: "bens-comuns",
    title: "Bens Comuns",
    description: "Recursos naturais ou culturais que são compartilhados por uma comunidade e geridos de forma coletiva, visando o benefício de todos e a sua preservação a longo prazo.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "bioeconomia",
    title: "Bioeconomia",
    description: "Modelo econômico que utiliza recursos biológicos renováveis para produzir alimentos, energia, produtos e serviços, buscando reduzir a dependência de combustíveis fósseis e promover a sustentabilidade.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "cadeias-valor-sustentaveis",
    title: "Cadeias de Valor Sustentáveis",
    description: "Redes de produção e distribuição que integram práticas ambientais, sociais e econômicas responsáveis em todas as etapas, desde a extração de matérias-primas até o consumo final.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "capital-social",
    title: "Capital Social",
    description: "Redes de relacionamento, confiança e reciprocidade que facilitam a cooperação e o desenvolvimento social em uma comunidade.",
    category: "Governança",
    createdAt: "2024-03-15"
  },
  {
    id: "cidades-resilientes",
    title: "Cidades Resilientes",
    description: "Centros urbanos capazes de se adaptar e se recuperar de choques e estresses, como desastres naturais, crises econômicas ou mudanças climáticas, garantindo a qualidade de vida e a segurança de seus habitantes.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "colaboracao-radical",
    title: "Colaboração Radical",
    description: "Abordagem que transcende a simples cooperação, buscando a cocriação e a partilha de recursos, conhecimentos e poder entre diferentes atores para alcançar objetivos transformadores.",
    category: "Engajamento",
    createdAt: "2024-03-15"
  },
  {
    id: "comunidades-intencionais",
    title: "Comunidades Intencionais",
    description: "Grupos de pessoas que escolhem viver juntas com base em valores, objetivos ou estilos de vida compartilhados, buscando criar um ambiente de apoio mútuo, colaboração e desenvolvimento pessoal.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "consumo-consciente",
    title: "Consumo Consciente",
    description: "Prática de escolher produtos e serviços com base em critérios sociais, ambientais e éticos, considerando o impacto de nossas decisões de compra no planeta e nas pessoas.",
    category: "Engajamento",
    createdAt: "2024-03-15"
  },
  {
    id: "decrescimento",
    title: "Decrescimento",
    description: "Teoria que propõe a redução da produção e do consumo em escala global para alcançar um equilíbrio entre a economia e os limites ecológicos do planeta, promovendo uma sociedade mais justa e sustentável.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "democracia-radical",
    title: "Democracia Radical",
    description: "Visão que defende a expansão da participação popular e do controle social em todas as esferas da vida, buscando superar as desigualdades e as formas de dominação presentes nas democracias representativas.",
    category: "Governança",
    createdAt: "2024-03-15"
  },
  {
    id: "desenvolvimento-comunitario",
    title: "Desenvolvimento Comunitário",
    description: "Processo de fortalecimento das capacidades de uma comunidade para identificar e resolver seus próprios problemas, promovendo a participação cidadã, a justiça social e o bem-estar coletivo.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "ecologia-profunda",
    title: "Ecologia Profunda",
    description: "Corrente de pensamento que questiona a visão antropocêntrica do mundo, defendendo a igualdade de valor entre todas as formas de vida e a necessidade de uma transformação radical em nossa relação com a natureza.",
    category: "Conceitos",
    createdAt: "2024-03-15"
  },
  {
    id: "ecoalfabetizacao",
    title: "Ecoalfabetização",
    description: "Processo de aprendizagem que desenvolve a compreensão das interconexões entre os sistemas naturais e sociais, capacitando as pessoas a agir de forma responsável e sustentável em relação ao meio ambiente.",
    category: "Conceitos",
    createdAt: "2024-03-15"
  },
  {
    id: "economia-circular",
    title: "Economia Circular",
    description: "Modelo econômico que busca reduzir o desperdício e o uso de recursos, incentivando a reutilização, a reciclagem e a remanufatura de produtos, prolongando seu ciclo de vida e minimizando o impacto ambiental.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "economia-do-bem-comum",
    title: "Economia do Bem Comum",
    description: "Modelo econômico que prioriza o bem-estar humano e a sustentabilidade ambiental em vez do lucro financeiro, incentivando práticas empresariais responsáveis e a participação cidadã na gestão da economia.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "ecossistemas-urbanos",
    title: "Ecossistemas Urbanos",
    description: "Comunidades de seres vivos que interagem entre si e com o ambiente físico nas cidades, incluindo áreas verdes, corpos d'água, fauna, flora e a população humana, influenciando a qualidade de vida e a sustentabilidade urbana.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "empreendedorismo-social",
    title: "Empreendedorismo Social",
    description: "Criação de negócios com o objetivo de resolver problemas sociais ou ambientais, gerando impacto positivo e promovendo a inclusão, a justiça e a sustentabilidade.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "energias-renovaveis",
    title: "Energias Renováveis",
    description: "Fontes de energia que se regeneram naturalmente, como a solar, a eólica, a hídrica e a biomassa, oferecendo alternativas limpas e sustentáveis aos combustíveis fósseis.",
    category: "Tecnologia",
    createdAt: "2024-03-15"
  },
  {
    id: "financas-eticas",
    title: "Finanças Éticas",
    description: "Sistema financeiro que considera critérios sociais, ambientais e de governança na alocação de recursos, incentivando investimentos responsáveis e transparentes que gerem impacto positivo na sociedade.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "florestas-urbanas",
    title: "Florestas Urbanas",
    description: "Áreas verdes nas cidades que possuem características de florestas, como diversidade de espécies, estratificação vertical e funções ecológicas, contribuindo para a melhoria da qualidade do ar, a regulação do clima e o bem-estar da população.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "governanca-colaborativa",
    title: "Governança Colaborativa",
    description: "Modelo de gestão que envolve a participação de diferentes atores sociais na tomada de decisões e na implementação de políticas públicas, buscando soluções mais eficazes, legítimas e adaptadas às necessidades locais.",
    category: "Governança",
    createdAt: "2024-03-15"
  },
  {
    id: "justica-ambiental",
    title: "Justiça Ambiental",
    description: "Princípio que busca garantir que todas as pessoas, independentemente de sua raça, etnia, classe social ou gênero, tenham o direito de viver em um ambiente saudável e seguro, e que não sejam desproporcionalmente afetadas pelos impactos negativos da degradação ambiental.",
    category: "Conceitos",
    createdAt: "2024-03-15"
  },
  {
    id: "moedas-sociais",
    title: "Moedas Sociais",
    description: "Sistemas de troca que complementam a moeda oficial, incentivando o comércio local, fortalecendo as redes comunitárias e promovendo a economia solidária.",
    category: "Economia",
    createdAt: "2024-03-15"
  },
  {
    id: "permacultura",
    title: "Permacultura",
    description: "Sistema de design que busca criar ambientes humanos sustentáveis e integrados à natureza, utilizando princípios ecológicos, técnicas agrícolas ancestrais e tecnologias apropriadas.",
    category: "Tecnologia",
    createdAt: "2024-03-15"
  },
  {
    id: "planejamento-urbano-participativo",
    title: "Planejamento Urbano Participativo",
    description: "Processo de elaboração de planos e projetos para as cidades que envolve a participação da população, buscando garantir que as decisões reflitam as necessidades e os desejos da comunidade.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "producao-organica",
    title: "Produção Orgânica",
    description: "Sistema de produção agrícola que utiliza práticas sustentáveis, como a rotação de culturas, o uso de adubos orgânicos e o controle biológico de pragas, evitando o uso de agrotóxicos e fertilizantes sintéticos.",
    category: "Tecnologia",
    createdAt: "2024-03-15"
  },
  {
    id: "reflorestamento",
    title: "Reflorestamento",
    description: "Processo de recuperação de áreas degradadas por meio do plantio de árvores nativas, visando restaurar a biodiversidade, proteger o solo e regular o clima.",
    category: "Tecnologia",
    createdAt: "2024-03-15"
  },
  {
    id: "resiliencia-urbana",
    title: "Resiliência Urbana",
    description: "Capacidade de uma cidade de se adaptar e se recuperar de choques e estresses, como desastres naturais, crises econômicas ou mudanças climáticas, garantindo a qualidade de vida e a segurança de seus habitantes.",
    category: "Território",
    createdAt: "2024-03-15"
  },
  {
    id: "seguranca-alimentar-nutricional",
    title: "Segurança Alimentar e Nutricional",
    description: "Direito de todas as pessoas a ter acesso regular e permanente a alimentos de qualidade, em quantidade suficiente, sem comprometer o acesso a outras necessidades essenciais.",
    category: "Conceitos",
    createdAt: "2024-03-15"
  },
  {
    id: "sociedade-do-bem-viver",
    title: "Sociedade do Bem Viver",
    description: "Visão que propõe um modelo de sociedade baseado na harmonia com a natureza, na valorização da cultura local, na justiça social e na busca da felicidade coletiva.",
    category: "Conceitos",
    createdAt: "2024-03-15"
  },
  {
    id: "tecnologias-apropriadas",
    title: "Tecnologias Apropriadas",
    description: "Soluções tecnológicas que são adaptadas às necessidades, aos recursos e à cultura de uma comunidade, buscando promover o desenvolvimento local, a autonomia e a sustentabilidade.",
    category: "Tecnologia",
    createdAt: "2024-03-15"
  },
  {
    id: "transicao-energetica",
    title: "Transição Energética",
    description: "Processo de substituição dos combustíveis fósseis por fontes de energia renovável, visando reduzir as emissões de gases de efeito estufa e mitigar as mudanças climáticas.",
    category: "Tecnologia",
    createdAt: "2024-03-15"
  }
];

// Função para adicionar uma nova entrada ao dicionário
export const addDictionaryEntry = (entry: Omit<DictionaryEntry, 'id' | 'createdAt'>) => {
  // Criar um ID baseado no título (slugify)
  const id = entry.title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');

  // Criar data atual no formato YYYY-MM-DD
  const createdAt = new Date().toISOString().split('T')[0];

  // Processar tags se existirem
  let processedTags: string[] | undefined;
  if (entry.tags) {
    if (Array.isArray(entry.tags)) {
      processedTags = entry.tags;
    } else {
      // Assumindo que entry.tags pode ser uma string
      const tagsString = entry.tags as unknown as string;
      processedTags = tagsString.split(',').map(tag => tag.trim()).filter(Boolean);
    }
  }

  // Criar nova entrada
  const newEntry: DictionaryEntry = {
    id,
    createdAt,
    title: entry.title,
    description: entry.description,
    category: entry.category,
    source: entry.source,
    code: entry.code,
    tags: processedTags,
  };

  // Adicionar ao array
  dictionaryEntries = [newEntry, ...dictionaryEntries];
  
  return newEntry;
};

// Categorias disponíveis
export const categories = Array.from(
  new Set(dictionaryEntries.map(entry => entry.category))
);

// Fontes disponíveis
export const sources = Array.from(
  new Set(dictionaryEntries.map(entry => entry.source).filter(Boolean))
);

// Função para adicionar uma nova categoria
export const addCategory = (category: string) => {
  if (!categories.includes(category)) {
    categories.push(category);
  }
};
