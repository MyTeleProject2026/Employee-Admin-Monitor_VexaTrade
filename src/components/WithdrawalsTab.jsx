import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function WithdrawalsTab({ userId }) {
  const { data: allWithdrawals, loading, error } = useEmployeeData('/api/admin/withdrawals');
  
  const withdrawals = Array.isArray(allWithdrawals) 
    ? allWithdrawals.filter(w => w.user_id === parseInt(userId))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-slate-400 animate-pulse">Loading withdrawals...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400">Error loading withdrawals: {error}</div>;
  }

  if (withdrawals.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
        <div className="text-4xl mb-3">💳</div>
        <p>No withdrawals found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {withdrawals.map((wd) => (
        <div key={wd.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{wd.coin || 'USDT'}</span>
              <StatusBadge status={wd.status} />
            </div>
            <span className="text-sm font-bold text-white">{wd.amount}</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
            <div className="col-span-2 truncate">
              <span className="text-slate-500">Address:</span> {wd.address || '—'}
            </div>
            <div className="col-span-2">
              <span className="text-slate-500">Date:</span> {new Date(wd.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
