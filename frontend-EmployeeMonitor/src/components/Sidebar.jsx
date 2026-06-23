// frontend-EmployeeMonitor/src/components/Sidebar.jsx
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Wallet,
  ArrowUpCircle,
  TrendingUp,
  Landmark,
  Bell,
  Settings,
  X,
  LogOut,
} from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Monitored Users', icon: Users },
  { path: '/user-management', label: 'User Management', icon: Settings },
  { path: '/deposits', label: 'Deposits', icon: Wallet },
  { path: '/withdrawals', label: 'Withdrawals', icon: ArrowUpCircle },
  { path: '/trades', label: 'Trades', icon: TrendingUp },
  { path: '/funds', label: 'Funds', icon: Landmark },
  { path: '/notifications', label: 'Notifications', icon: Bell },
];

export default function Sidebar({ isOpen, onClose }) {
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
    } catch (e) { /* ignore */ }
    window.location.href = '/login';
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={`
          fixed top-0 left-0 h-full w-[280px] bg-[#0a0e1a] border-r border-white/10 z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto
        `}
      >
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div>
            <span className="text-lg font-bold text-cyan-400">VexaTrade</span>
            <p className="text-[10px] text-slate-500">Employee Monitor</p>
          </div>
          <button onClick={onClose} className="lg:hidden text-slate-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100%-160px)]">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => {
                if (window.innerWidth < 1024) onClose();
              }}
              className={({ isActive }) => {
                // ✅ isActive is properly defined here
                return `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition ${
                  isActive
                    ? 'bg-cyan-500/20 text-cyan-400'
                    : 'text-slate-300 hover:bg-white/5'
                }`;
              }}
            >
              <item.icon size={18} className="shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-white/10 bg-[#050812]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-400 hover:bg-red-500/10 transition w-full"
          >
            <LogOut size={18} className="shrink-0" />
            <span>Logout</span>
          </button>
          <p className="text-[9px] text-slate-500 mt-2 text-center">Read-only · v1.0</p>
        </div>
      </aside>
    </>
  );
}
