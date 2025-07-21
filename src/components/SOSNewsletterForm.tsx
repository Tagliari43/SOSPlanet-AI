
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function SOSNewsletterForm() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (email) {
      console.log("Email para newsletter capturado (frontend):", email);
      toast({
        title: "Inscrição Confirmada! 🌱",
        description: `Obrigado, ${email}! Você está na lista para novidades da SOSPlanet.`,
      });
      setEmail('');
    }
  };

  return (
    <div>
      <p className="text-sm font-semibold text-center text-gray-700 dark:text-gray-300 mb-2">Mantenha-se Conectado! Seja o Primeiro a Saber!</p>
      <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2">
        <Input
          type="email"
          placeholder="Seu melhor e-mail para novidades..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="flex-grow dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <Button type="submit" className="bg-sos-600 hover:bg-sos-700 text-white w-full sm:w-auto">
          <Mail className="h-4 w-4 mr-2" /> Inscrever-se
        </Button>
      </form>
    </div>
  );
}
