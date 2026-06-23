import { Wallet, Calendar, User, Mail, Hash } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { safeString } from '../utils/helpers';

export default function UserOverview({ user }) {
  const name = safeString(user?.name, '—');
  const uid = safeString(user?.uid, '—');
  const email = safeString(user?.email, '—');
  const createdAt = user?.created_at ? new Date(user.created_at).toLocaleString() : '—';
  const status = user?.status || 'Active';
  const balance = user?.balance || '0.00';

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between"><span className="text-slate-400 flex items-center gap-2"><User size={14} className="text-cyan-400" /> Name</span><span className="text-white font-medium">{name}</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-400 flex items-center gap-2"><Hash size={14} className="text-cyan-400" /> UID</span><span className="text-white font-mono text-xs">{uid}</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-400 flex items-center gap-2"><Mail size={14} className="text-cyan-400" /> Email</span><span className="text-white truncate max-w-[180px]">{email}</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-400 flex items-center gap-2"><Calendar size={14} className="text-cyan-400" /> Joined</span><span className="text-white text-xs">{createdAt}</span></div>
          <div className="flex items-center justify-between"><span className="text-slate-400">Status</span><StatusBadge status={status} /></div>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Balance</h3>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center"><Wallet size={24} className="text-cyan-400" /></div>
          <div><div className="text-2xl font-bold text-white">{balance} USDT</div><div className="text-xs text-slate-500">Available balance</div></div>
        </div>
      </div>
    </div>
  );
}
