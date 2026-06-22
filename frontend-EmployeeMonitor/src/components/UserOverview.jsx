import { Wallet } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function UserOverview({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Account Information</h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Name</span><span className="text-white">{user.name || '—'}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">UID</span><span className="text-white">{user.uid || '—'}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Email</span><span className="text-white">{user.email || '—'}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Joined</span><span className="text-white">{user.created_at ? new Date(user.created_at).toLocaleString() : '—'}</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Status</span><StatusBadge status={user.status || 'Active'} /></div>
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Balance</h3>
        <div className="flex items-center gap-3">
          <Wallet size={24} className="text-cyan-400" />
          <div>
            <div className="text-2xl font-bold text-white">{user.balance || '0.00'} USDT</div>
            <div className="text-xs text-slate-500">Available balance</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
          <div className="rounded-lg border border-white/10 bg-[#050812] p-2">
            <div className="text-slate-500">Locked</div>
            <div className="text-white">{user.locked_balance || '0.00'} USDT</div>
          </div>
          <div className="rounded-lg border border-white/10 bg-[#050812] p-2">
            <div className="text-slate-500">Total</div>
            <div className="text-white">{user.total_balance || '0.00'} USDT</div>
          </div>
        </div>
      </div>
    </div>
  );
}