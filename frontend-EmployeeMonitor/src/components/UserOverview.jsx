import { Wallet, Calendar, User, Mail, Hash } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function UserOverview({ user }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Account Information */}
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Account Information</h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <User size={14} className="text-cyan-400" /> Name
            </span>
            <span className="text-white font-medium">{user.name || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Hash size={14} className="text-cyan-400" /> UID
            </span>
            <span className="text-white font-mono text-xs">{user.uid || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Mail size={14} className="text-cyan-400" /> Email
            </span>
            <span className="text-white truncate max-w-[180px]">{user.email || '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400 flex items-center gap-2">
              <Calendar size={14} className="text-cyan-400" /> Joined
            </span>
            <span className="text-white text-xs">{user.created_at ? new Date(user.created_at).toLocaleString() : '—'}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Status</span>
            <StatusBadge status={user.status || 'Active'} />
          </div>
        </div>
      </div>

      {/* Balance */}
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
        <h3 className="text-sm font-semibold text-slate-400 mb-3">Balance</h3>
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-cyan-500/20 flex items-center justify-center">
            <Wallet size={24} className="text-cyan-400" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{user.balance || '0.00'} USDT</div>
            <div className="text-xs text-slate-500">Available balance</div>
          </div>
        </div>
      </div>
    </div>
  );
}
