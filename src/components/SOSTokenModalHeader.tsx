
import React from 'react';
import {
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export default function SOSTokenModalHeader() {
  return (
    <DialogHeader className="p-6 pb-4 border-b dark:border-gray-800">
      <DialogTitle className="text-2xl md:text-3xl font-bold text-center gradient-text">
        ✨ Participe da Missão SOS Token! ✨
      </DialogTitle>
      <DialogDescription className="text-center text-sm text-muted-foreground pt-1">
        Descubra como o SOS Token é a chave para um futuro mais verde e justo.
      </DialogDescription>
    </DialogHeader>
  );
}
