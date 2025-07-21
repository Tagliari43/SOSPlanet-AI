
import React from 'react';
import { DialogFooter } from "@/components/ui/dialog";
import SOSNewsletterForm from './SOSNewsletterForm';
import SOSSocialLinks from './SOSSocialLinks';
import SOSImpactSection from './SOSImpactSection';

export default function SOSTokenModalFooter() {
  return (
    <DialogFooter className="p-6 pt-4 border-t dark:border-gray-800 bg-slate-50 dark:bg-gray-900/50">
      <div className="w-full space-y-4">
        <SOSNewsletterForm />
        <SOSSocialLinks />
        <SOSImpactSection />
      </div>
    </DialogFooter>
  );
}
