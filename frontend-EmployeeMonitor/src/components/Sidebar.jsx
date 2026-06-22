import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  Bell,
  X,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/deposits', label: 'Deposits', icon: Wallet },
  { path: '/withdrawals', label: 'Withdrawals', icon: ArrowUpCircle },
  { path: '/trades', label: 'Trades', icon: TrendingUp },
  { path: '/funds', label: 'Funds', icon: Landmark },
  { path: '/notifications', label: 'Notifications', icon: Bell },
];

export default function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-[#0a0e1a] border-r border-white/10 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <span className="text-xl font-bold text-cyan-400">VexaTrade</span>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-300 hover:bg-white/5'
                }`
              }
            >
              <item.icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 text-xs text-slate-500 border-t border-white/10 pt-4">
          <p>Employee Monitor</p>
          <p className="text-[10px]">Read‑only · v1.0</p>
        </div>
      </aside>
    </>
  );
}
