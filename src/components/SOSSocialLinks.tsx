
import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function SOSSocialLinks() {
  return (
    <div className="text-center pt-2 space-y-2">
      <h5 className="text-xs font-medium text-muted-foreground">Junte-se à Nossa Comunidade:</h5>
      <div className="flex justify-center items-center gap-4">
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">Discord <ExternalLink className="h-3 w-3"/></a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">Telegram <ExternalLink className="h-3 w-3"/></a>
        <a href="#" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1">Twitter/X <ExternalLink className="h-3 w-3"/></a>
      </div>
    </div>
  );
}
