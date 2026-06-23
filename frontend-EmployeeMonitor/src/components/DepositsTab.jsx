import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function DepositsTab({ userId }) {
  const { data: allDeposits, loading, error } = useEmployeeData('/api/admin/deposits');
  
  const deposits = Array.isArray(allDeposits) 
    ? allDeposits.filter(d => d.user_id === parseInt(userId))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-slate-400 animate-pulse">Loading deposits...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400">Error loading deposits: {error}</div>;
  }

  if (deposits.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
        <div className="text-4xl mb-3">💰</div>
        <p>No deposits found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {deposits.map((dep) => (
        <div key={dep.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">{dep.coin || 'USDT'}</span>
              <StatusBadge status={dep.status} />
            </div>
            <span className="text-sm font-bold text-white">{dep.amount}</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
            <div className="col-span-2 truncate">
              <span className="text-slate-500">Address:</span> {dep.address || '—'}
            </div>
            <div className="col-span-2">
              <span className="text-slate-500">Date:</span> {new Date(dep.created_at).toLocaleString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
