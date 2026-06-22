import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';

export default function FundsList() {
  const { data: funds, loading, error } = useEmployeeData('/api/admin/funds');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading funds...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        Error loading funds: {error}
      </div>
    );
  }

  const items = Array.isArray(funds) ? funds : [];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">All Funds</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
          <div className="text-4xl mb-3">🏦</div>
          <p>No funds found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((fund) => (
            <div key={fund.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-white truncate max-w-[120px]">{fund.plan_name || '—'}</span>
                  <StatusBadge status={fund.status} />
                </div>
                <span className="text-sm font-bold text-white">{fund.locked_principal}</span>
              </div>
              <div className="grid grid-cols-2 gap-1 text-xs">
                <div>
                  <span className="text-slate-500">User:</span> <span className="text-white">{fund.user_id}</span>
                </div>
                <div>
                  <span className="text-slate-500">APY:</span> <span className="text-emerald-300">{fund.apy || '—'}%</span>
                </div>
                <div>
                  <span className="text-slate-500">Day:</span> <span className="text-white">{fund.current_day}/{fund.total_days}</span>
                </div>
                <div>
                  <span className="text-slate-500">Date:</span> <span className="text-white text-xs">{new Date(fund.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
