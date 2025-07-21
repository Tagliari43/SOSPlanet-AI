
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';
import SOSTokenModalHeader from './SOSTokenModalHeader';
import SOSTokenModalTabs from './SOSTokenModalTabs';
import SOSTokenModalFooter from './SOSTokenModalFooter';

interface SOSTokenModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export default function SOSTokenModal({ isOpen, onOpenChange }: SOSTokenModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white dark:bg-gray-950 sm:max-w-2xl md:max-w-3xl p-0 shadow-2xl rounded-lg overflow-hidden">
        <SOSTokenModalHeader />
        <SOSTokenModalTabs />
        <SOSTokenModalFooter />
        <DialogClose asChild>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4 text-muted-foreground hover:bg-slate-200 dark:hover:bg-gray-700 rounded-full" onClick={() => onOpenChange(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Fechar</span>
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
