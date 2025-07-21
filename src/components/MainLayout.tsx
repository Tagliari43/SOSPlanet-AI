// src/components/MainLayout.tsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FooterSection from './FooterSection';

const MainLayout: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Navbar />
      <main className="flex-grow">
        {/* A <Outlet /> é onde o conteúdo da página atual (Index ou Pousada) será renderizado */}
        <Outlet />
      </main>
      <FooterSection />
    </div>
  );
};

export default MainLayout;