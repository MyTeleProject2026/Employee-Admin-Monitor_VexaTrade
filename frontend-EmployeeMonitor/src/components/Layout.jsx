import { useState, useEffect } from 'react';
import { Menu, LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BottomNav from './BottomNav';

export default function Layout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [employeeName, setEmployeeName] = useState('Employee');

  useEffect(() => {
    const name = localStorage.getItem('employeeName') || 'Employee';
    setEmployeeName(name);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('adminToken');
      localStorage.removeItem('token');
      localStorage.removeItem('employeeToken');
      localStorage.removeItem('employeeEmail');
      localStorage.removeItem('employeeName');
      localStorage.removeItem('employeeSession');
      localStorage.removeItem('employeeId');
      localStorage.removeItem('assignedUsers');
    } catch (_) { /* ignore */ }
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-[#050812] text-white flex">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="flex-1 flex flex-col min-h-screen lg:ml-64">
        <header className="lg:hidden flex items-center justify-between p-3 border-b border-white/10 bg-[#0a0e1a] sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-white p-1"><Menu size={24} /></button>
          <span className="text-base font-bold text-cyan-400 truncate max-w-[140px]">VexaTrade Monitor</span>
          <button onClick={handleLogout} className="text-slate-400 hover:text-white p-1"><LogOut size={20} /></button>
        </header>
        <header className="hidden lg:flex items-center justify-between p-4 border-b border-white/10 bg-[#0a0e1a] sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="text-lg font-bold text-cyan-400">VexaTrade Employee Monitor</span>
            <span className="text-xs text-slate-500 bg-white/5 px-2 py-1 rounded-full">Read-only</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400 flex items-center gap-2"><User size={16} className="text-cyan-400" />{employeeName}</span>
            <button onClick={handleLogout} className="text-sm text-slate-400 hover:text-white transition flex items-center gap-1"><LogOut size={16} /> Logout</button>
          </div>
        </header>
        <main className="flex-1 p-3 sm:p-4 pb-24 lg:pb-6 overflow-y-auto">{children}</main>
        <BottomNav />
      </div>
    </div>
  );
}
