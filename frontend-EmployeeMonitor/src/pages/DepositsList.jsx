import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';

export default function DepositsList() {
  const { data: deposits, loading, error } = useEmployeeData('/api/admin/deposits');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading deposits...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        Error loading deposits: {error}
      </div>
    );
  }

  const items = Array.isArray(deposits) ? deposits : [];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">All Deposits</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
          <div className="text-4xl mb-3">💰</div>
          <p>No deposits found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((dep) => (
            <div key={dep.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white">{dep.coin || 'USDT'}</span>
                  <StatusBadge status={dep.status} />
                </div>
                <span className="text-sm font-bold text-white">{dep.amount}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs text-slate-400">
                <div>
                  <span className="text-slate-500">User:</span> {dep.user_id}
                </div>
                <div>
                  <span className="text-slate-500">Date:</span> {new Date(dep.created_at).toLocaleDateString()}
                </div>
                <div className="col-span-2 truncate">
                  <span className="text-slate-500">Address:</span> {dep.address || '—'}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
