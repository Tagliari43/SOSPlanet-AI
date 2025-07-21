// src/App.tsx - VERSÃO COM A ROTA DO PONTO DE ENCONTRO

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
import PontoDeEncontroPage from "./pages/PontoDeEncontroPage"; // Importamos a nova página do chat

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Rota Pai que aplica o MainLayout a todas as filhas */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/pousada-ai" element={<PousadaPage />} />
            
            {/* ROTA PARA O NOSSO NOVO PONTO DE ENCONTRO */}
            <Route path="/ponto-de-encontro" element={<PontoDeEncontroPage />} />
          </Route>
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;