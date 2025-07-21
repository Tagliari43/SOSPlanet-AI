import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import FooterSection from '../components/FooterSection';
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wind, Moon, Globe, Leaf, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Compassos = () => {
  const [mensagem, setMensagem] = useState("Carregando mensagem...");
  const [mensagemSimbolica, setMensagemSimbolica] = useState("Você é uma ponte entre mundos");
  const [hora, setHora] = useState("");
  const [respiracao, setRespiracao] = useState("Inspirar...");
  const [frequenciaSchumann, setFrequenciaSchumann] = useState("7,8");
  const [arvoresPlantadas, setArvoresPlantadas] = useState(4500);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currentSound, setCurrentSound] = useState("432hz");
  
  // Estado para o som principal (compassos de gaia)
  const [isSomPrincipalTocando, setIsSomPrincipalTocando] = useState(false);
  const somPrincipalRef = React.useRef<HTMLAudioElement>(null);
  const somPrincipalSrc = '/audio/compassos_de_gaia_noah_v3.mp3';
  
  const { toast } = useToast();
  
  // Referência para o elemento de áudio dos sons ambiente
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // Sons disponíveis
  const sounds = {
    "432hz": "/sounds/432hz.mp3",
    "floresta": "/sounds/floresta.mp3",
    "chuva": "/sounds/chuva.mp3",
    "oceano": "/sounds/oceano.mp3"
  };

  // Mensagens inspiradoras pré-definidas (simulando Dicionário Vivo)
  const mensagens = {
    "11:11": "A Terra respira com você. Este é o momento de escutar.",
    "17:17": "Você está em sintonia com Gaia. Confie no seu caminho.",
  };

  const alternarRespiracao = () => {
    setRespiracao(respiracao === "Inspirar..." ? "Expirar..." : "Inspirar...");
  };

  // Função para controlar o som principal (compassos de gaia)
  const toggleSomPrincipal = () => {
    if (!somPrincipalRef.current) return;

    if (isSomPrincipalTocando) {
      somPrincipalRef.current.pause();
    } else {
      // Garante que a fonte está correta antes de tocar
      if (somPrincipalRef.current.src !== window.location.origin + somPrincipalSrc) {
        somPrincipalRef.current.src = somPrincipalSrc;
        somPrincipalRef.current.load(); // Importante para carregar a nova fonte se mudou
      }
      somPrincipalRef.current.play().catch(error => {
        console.error("Erro ao tocar áudio principal:", error);
        toast({
          title: "Erro ao reproduzir",
          description: "Não foi possível iniciar o som dos Compassos de Gaia. Tente novamente.",
          variant: "destructive"
        });
      });
    }
    setIsSomPrincipalTocando(!isSomPrincipalTocando);
  };

  const obterMensagemDoMomento = () => {
    const agora = new Date();
    const horaFormatada = `${agora.getHours()}:${agora.getMinutes()}`;
    setHora(horaFormatada);
    
    const mensagemAtual = mensagens[horaFormatada] || "Respire. Sinta. Você está aqui.";
    setMensagem(mensagemAtual);
    
    // Notifica o usuário quando uma mensagem especial é encontrada
    if (mensagens[horaFormatada]) {
      toast({
        title: "Momento especial!",
        description: "Uma mensagem especial de Gaia foi revelada.",
      });
    }
  };

  // Controle de reprodução de áudio ambiente
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Erro ao reproduzir áudio:", error);
          toast({
            title: "Erro ao reproduzir",
            description: "Não foi possível iniciar o áudio. Tente novamente.",
            variant: "destructive"
          });
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const changeSound = (soundKey: string) => {
    setCurrentSound(soundKey);
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      audioRef.current.src = sounds[soundKey];
      audioRef.current.load();
      if (wasPlaying) {
        audioRef.current.play().catch(console.error);
      }
    }
    
    toast({
      title: "Som alterado",
      description: `Agora tocando: ${soundKey === "432hz" ? "Som de 432 Hz" : 
                                     soundKey === "floresta" ? "Sons da floresta" :
                                     soundKey === "chuva" ? "Sons de chuva" : "Sons do oceano"}`,
    });
  };

  useEffect(() => {
    obterMensagemDoMomento();
    
    // Atualiza a mensagem a cada minuto
    const intervaloMensagem = setInterval(obterMensagemDoMomento, 60000);
    
    // Cria o efeito de respiração a cada 4 segundos
    const intervaloRespiracao = setInterval(alternarRespiracao, 4000);
    
    return () => {
      clearInterval(intervaloMensagem);
      clearInterval(intervaloRespiracao);
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 md:py-16 relative overflow-hidden">
        {/* Gradiente de fundo */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-teal-300/90 via-teal-400/70 to-green-700/90 -z-10"
          style={{ backgroundImage: "url('/lovable-uploads/fc789903-7d04-4abe-902c-705b1bfe76f3.png')", backgroundSize: "cover", backgroundPosition: "center", backgroundBlendMode: "soft-light" }}
        ></div>
        
        {/* Audio elements (hidden) */}
        <audio ref={audioRef} src={sounds[currentSound]} loop preload="auto" />
        <audio ref={somPrincipalRef} src={somPrincipalSrc} loop preload="auto" />
        
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-12 text-white text-center drop-shadow-md">
            Compassos de Gaia
          </h1>
          
          {/* Botão "Respirar com a Terra" com funcionalidade de áudio */}
          <div className="flex justify-center mb-10">
            <Button 
              onClick={toggleSomPrincipal}
              className="flex items-center px-8 py-4 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white shadow-lg hover:bg-white/30 transition-all duration-300"
            >
              {isSomPrincipalTocando ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
              {isSomPrincipalTocando ? 'Pausar Som' : 'Respirar com a Terra'}
            </Button>
          </div>
          
          {/* Controles de áudio ambiente */}
          <div className="flex justify-center items-center gap-4 mb-8">
            <Button 
              onClick={togglePlay}
              variant="outline" 
              size="lg"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
            >
              {isPlaying ? <Pause className="mr-2" /> : <Play className="mr-2" />}
              {isPlaying ? "Pausar" : "Tocar"}
            </Button>
            
            <Button
              onClick={toggleMute}
              variant="outline"
              className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30"
            >
              {isMuted ? <VolumeX /> : <Volume2 />}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30">
                  {currentSound === "432hz" ? "432 Hz" : 
                   currentSound === "floresta" ? "Floresta" : 
                   currentSound === "chuva" ? "Chuva" : "Oceano"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white/90 backdrop-blur-md">
                <DropdownMenuLabel>Escolha um som</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => changeSound("432hz")}>Som de 432 Hz</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeSound("floresta")}>Sons da Floresta</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeSound("chuva")}>Sons da Chuva</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeSound("oceano")}>Sons do Oceano</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-10">
            {/* Círculo principal de respiração */}
            <div className="md:col-span-5 flex justify-center items-center">
              <div 
                onClick={alternarRespiracao}
                className="w-60 h-60 md:w-80 md:h-80 rounded-full flex items-center justify-center bg-teal-500/40 backdrop-blur-md border border-white/30 shadow-xl cursor-pointer"
                style={{ animation: "pulse 4s infinite" }}
              >
                <div className="text-3xl md:text-4xl text-white font-light">{respiracao}</div>
              </div>
            </div>
            
            {/* Cards informativos */}
            <div className="md:col-span-7 space-y-6">
              {/* Card 1 - Você está seguro */}
              <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl text-white font-medium mb-1">Você está seguro,</h3>
                      <p className="text-white/90">A Terra respira com você.</p>
                    </div>
                    <Moon className="text-yellow-200" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Card 2 - Mensagem simbólica */}
              <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg">
                <CardContent className="p-5">
                  <h3 className="text-white font-medium mb-3">Mensagem simbólica de hoje</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-300"></div>
                    <p className="text-white">{mensagemSimbolica}</p>
                  </div>
                </CardContent>
              </Card>
              
              {/* Card 3 - Dicionário vivo */}
              <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">Dicionário Vivo</h3>
                      <p className="text-white/90">{mensagem}</p>
                    </div>
                    <div className="w-12 h-12 rounded-md bg-white/30 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24">
                        <path fill="currentColor" d="M3,9H7L12,4V20L7,15H3V9M16,15H12V17H16V15M16,7H12V9H16V7M16,11H12V13H16V11Z" />
                      </svg>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Card 4 - Ressonância Schumann */}
              <Card className="bg-white/20 backdrop-blur-md border-white/30 shadow-lg">
                <CardContent className="p-5">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="text-white font-medium mb-1">Energia da Ressonância Schumann</h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                      <span className="text-white font-medium">{frequenciaSchumann}<span className="text-xs align-top ml-0.5">Hz</span></span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Árvores plantadas */}
          <div className="text-center mt-16 mb-8">
            <div className="flex justify-center mb-4">
              <Globe className="h-10 w-10 text-green-300" />
            </div>
            <p className="text-xl text-white font-medium">
              Plantamos {arvoresPlantadas} árvores
            </p>
          </div>
          
        </div>
      </main>
      <FooterSection />
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4); }
          50% { transform: scale(1.05); opacity: 0.6; box-shadow: 0 0 0 20px rgba(255, 255, 255, 0); }
          100% { transform: scale(1); opacity: 0.8; box-shadow: 0 0 0 0 rgba(255, 255, 255, 0); }
        }
      `}} />
    </div>
  );
};

export default Compassos;
