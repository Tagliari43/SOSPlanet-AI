
import React from 'react';
import Navbar from '../components/Navbar';
import DictionarySection from '../components/DictionarySection';
import DictionaryEntries from '../components/DictionaryEntries';
import FooterSection from '../components/FooterSection';

const Dictionary = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <DictionarySection />
        <div className="py-12 bg-muted">
          <div className="container-custom">
            <DictionaryEntries />
          </div>
        </div>
      </main>
      <FooterSection />
    </div>
  );
};

export default Dictionary;
