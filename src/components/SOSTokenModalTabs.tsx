
import React from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Heart, Rocket, TrendingUp, ExternalLink, Info, Users, Gift } from 'lucide-react';

export default function SOSTokenModalTabs() {
  return (
    <Tabs defaultValue="coracao" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-slate-100 dark:bg-gray-900 p-1 sticky top-0 z-10 border-b dark:border-gray-800">
        <TabsTrigger value="coracao" className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-sos-600 dark:data-[state=active]:text-sos-400 data-[state=active]:font-semibold data-[state=active]:shadow-md rounded-md">
          <Heart className="h-4 w-4" /> O Coração da Missão
        </TabsTrigger>
        <TabsTrigger value="participar" className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-sos-600 dark:data-[state=active]:text-sos-400 data-[state=active]:font-semibold data-[state=active]:shadow-md rounded-md">
          <Rocket className="h-4 w-4" /> Como Participar
        </TabsTrigger>
        <TabsTrigger value="ecossistema" className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm py-2.5 data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:text-sos-600 dark:data-[state=active]:text-sos-400 data-[state=active]:font-semibold data-[state=active]:shadow-md rounded-md">
          <TrendingUp className="h-4 w-4" /> Ecossistema e Futuro
        </TabsTrigger>
      </TabsList>

      <div className="p-6 max-h-[calc(70vh-180px)] overflow-y-auto text-sm sm:text-base leading-relaxed">
        {/* ABA 1: O CORAÇÃO DA MISSÃO */}
        <TabsContent value="coracao" className="space-y-5">
          <h3 className="text-xl font-semibold text-forest-700 dark:text-forest-300 flex items-center gap-2">
            <Heart className="h-5 w-5 text-sos-500" />O Propósito do SOS Token
          </h3>
          <blockquote className="border-l-4 border-sos-500 pl-4 italic text-muted-foreground">
            "Você não está apenas adquirindo um token, está semeando um futuro mais verde e justo, um futuro onde a esperança floresce." - Lumina
          </blockquote>
          <p>
            O <strong>SOS Token</strong> é a força vital que impulsiona a grandiosa missão da SOSPlanet. Cada token não é um mero ativo digital; ele representa um compromisso ativo e uma participação direta na regeneração do nosso planeta e no empoderamento de suas comunidades.
          </p>
          <div className="p-4 bg-sos-50 dark:bg-gray-800/50 border border-sos-200 dark:border-gray-700 rounded-lg">
            <h4 className="font-semibold text-sos-700 dark:text-sos-300 mb-2">Cada SOS Token visa financiar ações concretas como:</h4>
            <ul className="list-none space-y-2 text-xs sm:text-sm">
              <li className="flex items-start gap-2"><span className="text-xl">🌳</span> Plantio de árvores em áreas críticas, começando pela Amazônia, nosso pulmão global.</li>
              <li className="flex items-start gap-2"><span className="text-xl">🤝</span> Fornecimento de alimentos e recursos essenciais para comunidades em situação de vulnerabilidade.</li>
              <li className="flex items-start gap-2"><span className="text-xl">💡</span> Implementação e fomento de projetos de energia limpa e sustentável para todos.</li>
              <li className="flex items-start gap-2"><span className="text-xl">📚</span> Desenvolvimento de plataformas educacionais inovadoras, potencializadas por IA, para democratizar o conhecimento.</li>
            </ul>
          </div>
          <p className="font-semibold text-center text-lg text-sos-600 dark:text-sos-400 pt-3">
            🚀 **Lançamento Oficial: Estamos em contagem regressiva!** Fique conectado para ser parte desta história desde o início!
          </p>
        </TabsContent>

        {/* ABA 2: COMO PARTICIPAR */}
        <TabsContent value="participar">
          <div className="space-y-5 leading-relaxed">
            <h3 className="text-xl font-semibold text-forest-700 dark:text-forest-300 flex items-center gap-2">
              <Rocket className="h-5 w-5 text-sos-500" /> Prepare-se para Impulsionar a Mudança!
            </h3>
            <p className="text-muted-foreground text-sm">
              O SOS Token ainda não está disponível para aquisição pública, mas sua jornada como um Guardião da Terra pode começar a se desenhar agora! Estamos trabalhando intensamente para um lançamento transparente e de grande impacto.
            </p>

            {/* Seção Futura Aquisição */}
            <div className="p-4 bg-sky-50 dark:bg-sky-900/30 border border-sky-200 dark:border-sky-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-sky-700 dark:text-sky-300 mb-2">
                🚀 Adquirindo Seus SOS Tokens (Em Breve)
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Assim que o lançamento oficial ocorrer, você poderá adquirir SOS Tokens através de:
              </p>
              <ul className="list-disc list-inside pl-4 space-y-1 text-xs">
                <li>Plataformas de Troca Descentralizadas (DEXs) parceiras (mais informações em breve).</li>
                <li>Nosso portal oficial SOSPlanet (detalhes serão anunciados).</li>
              </ul>
              <p className="text-xs mt-3">
                <strong>Como se preparar:</strong> Comece a se familiarizar com carteiras digitais compatíveis com as redes [Blockchain a ser definida, ex: Algorand, Hedera] e o processo de aquisição da criptomoeda nativa dessas redes. Publicaremos guias detalhados para facilitar sua jornada!
              </p>
            </div>

            {/* Seção Doação e Recompensas */}
            <div className="p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-amber-700 dark:text-amber-300 mb-2">
                💖 Apoie Diretamente e Ajude a SOSPlanet Hoje!
              </h4>
              <p className="text-xs text-muted-foreground mb-2">
                Sua contribuição direta é fundamental para o reflorestamento, combate à fome e para impulsionar nossas iniciativas. Cada doação nos aproxima de um planeta mais saudável e justo. Obrigado!
              </p>
              
              <div className="mt-3 pt-3 border-t border-amber-300 dark:border-amber-600 space-y-3">
                <p className="text-sm font-medium mb-1 text-center text-amber-800 dark:text-amber-200">Nossos Endereços para Doação Direta:</p>
                
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-dashed border-amber-400 dark:border-amber-500">
                  <p className="text-xs font-semibold">Bitcoin (BTC):</p>
                  <code className="block text-xxs sm:text-xs bg-slate-200 dark:bg-slate-700 p-2 rounded break-all my-1">1Jez12SqdGtMQrKdTiBWWvRYB4sPY8a4S</code>
                  <p className="text-xxs italic mt-1">Atenção: Envie apenas BTC para este endereço.</p>
                </div>

                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-dashed border-amber-400 dark:border-amber-500">
                  <p className="text-xs font-semibold">USDT (Redes ERC20/BEP20/Polygon etc.):</p>
                  <code className="block text-xxs sm:text-xs bg-slate-200 dark:bg-slate-700 p-2 rounded break-all my-1">0x3637ff4fbcf6d91f6f6e0c4a2913e532d8b909b5</code>
                  <p className="text-xxs italic mt-1">Atenção: Envie apenas USDT (verifique a rede correta compatível com este endereço, como ETH, BNB, Polygon) para este endereço.</p>
                </div>
                
                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-dashed border-amber-400 dark:border-amber-500">
                  <p className="text-xs font-semibold">Ethereum (ETH) e Tokens ERC20:</p>
                  <code className="block text-xxs sm:text-xs bg-slate-200 dark:bg-slate-700 p-2 rounded break-all my-1">0x3637ff4fbcf6d91f6f6e0c4a2913e532d8b909b5</code>
                  <p className="text-xxs italic mt-1">Atenção: Envie apenas ETH ou tokens ERC20 para este endereço.</p>
                </div>

                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-dashed border-amber-400 dark:border-amber-500">
                  <p className="text-xs font-semibold">BNB (BEP20) e Tokens BEP20:</p>
                  <code className="block text-xxs sm:text-xs bg-slate-200 dark:bg-slate-700 p-2 rounded break-all my-1">0x3637ff4fbcf6d91f6f6e0c4a2913e532d8b909b5</code>
                  <p className="text-xxs italic mt-1">Atenção: Envie apenas BNB ou tokens BEP20 para este endereço.</p>
                </div>

                <div className="p-2 bg-white/50 dark:bg-black/20 rounded border border-dashed border-amber-400 dark:border-amber-500">
                  <p className="text-xs font-semibold">Algorand (ALGO):</p>
                  <code className="block text-xxs sm:text-xs bg-slate-200 dark:bg-slate-700 p-2 rounded break-all my-1">JOK5TYXGOWD5NZ57ESGFECNWOSSQYXD7VUMNZAJIPXHWR2QVOPQV77MAZI</code>
                  <p className="text-xxs italic mt-1">Atenção: Envie apenas ALGO para este endereço.</p>
                </div>
                <p className="text-xxs text-center mt-2 italic">Sempre verifique os endereços com cuidado antes de realizar qualquer transação. Em caso de dúvida, entre em contato conosco através dos canais da comunidade.</p>
              </div>
              
              <p className="text-xs mt-4">
                <strong>Programa Guardiões Frequentes (Em Desenvolvimento):</strong> Reconhecemos e valorizamos seu compromisso contínuo! Doadores regulares (ex: 3 contribuições em 30 dias) serão elegíveis a bônus especiais em SOS Tokens. Limite de bônus por ciclo (ex: 50 SOS). Detalhes completos serão anunciados em breve!
              </p>
            </div>

            {/* Aviso de Risco */}
            <div className="mt-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg text-xs text-red-700 dark:text-red-400 flex items-start gap-2 shadow-sm">
              <Info className="h-5 w-5 mt-0.5 shrink-0 text-red-500" />
              <div>
                <strong className="font-medium block mb-1">Aviso Importante sobre Riscos e Investimentos:</strong>
                <p>Investir em criptoativos e participar de projetos em estágio inicial envolve riscos significativos, incluindo a volatilidade de preços e a possibilidade de perda de capital. A SOSPlanet se esforça pela transparência e pelo impacto positivo, mas é crucial que você participe com consciência, invista apenas valores que pode se permitir perder e sempre realize sua própria pesquisa (DYOR - Do Your Own Research) antes de tomar qualquer decisão financeira. Este material não constitui aconselhamento financeiro.</p>
              </div>
            </div>
          </div>
        </TabsContent>

        {/* ABA 3: ECOSSISTEMA E FUTURO */}
        <TabsContent value="ecossistema">
          <div className="space-y-5 leading-relaxed">
            <h3 className="text-xl font-semibold text-forest-700 dark:text-forest-300 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-sos-500" /> Construindo um Ecossistema Sustentável e de Impacto
            </h3>
            <p className="text-muted-foreground text-sm">
              O SOS Token é projetado para ser a espinha dorsal de um ecossistema vibrante, transparente e auto-sustentável, inteiramente focado em gerar impacto positivo e duradouro para o nosso planeta e suas comunidades.
            </p>

            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-emerald-700 dark:text-emerald-300 mb-2 flex items-center gap-1.5">
                <ExternalLink className="h-4 w-4" /> Negociação e Liquidez (Pós-Lançamento Oficial)
              </h4>
              <p className="text-xs text-muted-foreground">
                Após o lançamento e as listagens cuidadosamente planejadas em plataformas de troca, você terá a liberdade de negociar seus SOS Tokens. Nossa estratégia inicial focará em Exchanges Descentralizadas (DEXs) parceiras que compartilhem nossos valores de transparência e acessibilidade, promovendo um ambiente de negociação justo para nossa comunidade global.
              </p>
            </div>

            <div className="p-4 bg-teal-50 dark:bg-teal-900/30 border border-teal-200 dark:border-teal-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-teal-700 dark:text-teal-300 mb-2 flex items-center gap-1.5">
                <Users className="h-4 w-4" /> Fortalecendo a Missão Através da Participação
              </h4>
              <p className="text-xs text-muted-foreground">
                Cada transação, cada token mantido (holding) como um voto de confiança, e cada interação dentro do ecossistema SOSPlanet contribui ativamente para sua saúde, liquidez e vitalidade. Esta participação coletiva fortalece nossa capacidade de financiar um número crescente de projetos de impacto, expandindo nosso alcance e a profundidade da transformação que podemos gerar juntos.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-lg shadow-sm">
              <h4 className="font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-1.5">
                <Gift className="h-4 w-4" /> Visão de Valor Real e Legado Duradouro
              </h4>
              <p className="text-xs text-muted-foreground">
                Acreditamos que o verdadeiro e sustentável valor do SOS Token está intrinsecamente ligado ao impacto positivo e mensurável que a SOSPlanet gera no mundo real: cada árvore que volta a crescer, cada comunidade que é apoiada, cada avanço em energia limpa e cada mente que é capacitada pela educação. Nosso sucesso é o reflexo direto da saúde e prosperidade do nosso planeta e de seus habitantes. Este é o legado que estamos construindo.
              </p>
            </div>
            
            <p className="text-xs text-center text-muted-foreground pt-4 italic">
              Mais detalhes sobre nossa tokenomics completa, o roadmap de desenvolvimento do ecossistema, futuras listagens e parcerias estratégicas serão divulgados em nosso Whitepaper oficial e através dos nossos canais de comunicação. Fique conectado!
            </p>
          </div>
        </TabsContent>
      </div>
    </Tabs>
  );
}
