// src/App.tsx - VERSÃO FINALÍSSIMA, LIMPA E CORRIGIDA

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import MainLayout from "./components/MainLayout";

// Páginas
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PousadaPage from "./pages/PousadaPage";
import PontoDeEncontroPage from "./pages/PontoDeEncontroPage";
import UtopiaRoom from "./pages/UtopiaRoom";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota Pai que aplica o MainLayout a todas as filhas */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Index />} />
            <Route path="pousada-ai" element={<PousadaPage />} />
            <Route path="ponto-de-encontro" element={<PontoDeEncontroPage />} />
          </Route>

          {/* A rota mágica para a Utopia (sem o layout principal) */}
          <Route path="/Utopia.txt" element={<UtopiaRoom />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;