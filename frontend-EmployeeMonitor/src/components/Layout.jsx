// src/pages/components/Layout.jsx
import { useState } from 'react';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#050812] text-white flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        {/* Mobile Header */}
        <header className="lg:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0e1a]">
          <button onClick={() => setSidebarOpen(true)} className="text-white">
            <Menu size={24} />
          </button>
          <span className="text-lg font-bold text-cyan-400">VexaTrade Monitor</span>
          <div className="w-6" />
        </header>

        <main className="flex-1 p-4 pb-24 lg:pb-6 overflow-y-auto">
          {children}
        </main>

        <BottomNav />
      </div>
    </div>
  );
}
