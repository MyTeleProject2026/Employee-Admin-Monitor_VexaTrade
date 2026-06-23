// frontend-EmployeeMonitor/src/components/BottomNav.jsx
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Wallet, Bell } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/users', label: 'Users', icon: Users },
  { path: '/deposits', label: 'Deposits', icon: Wallet },
  { path: '/notifications', label: 'Alerts', icon: Bell },
];

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-[#0a0e1a] border-t border-white/10 lg:hidden">
      <div className="flex justify-around items-center h-14">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => {
              // ✅ Safe: treat missing isActive as false
              const active = typeof isActive === 'boolean' ? isActive : false;
              return `flex flex-col items-center justify-center w-full h-full text-[10px] transition ${
                active ? 'text-cyan-400' : 'text-slate-500'
              }`;
            }}
          >
            <item.icon size={18} className={active ? 'text-cyan-400' : 'text-slate-500'} />
            <span className="mt-0.5">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
