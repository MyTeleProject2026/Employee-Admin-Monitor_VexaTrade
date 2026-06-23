import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';
import { safeString } from '../utils/helpers';

export default function FundsList() {
  const { data: funds, loading, error } = useEmployeeData('/api/admin/funds');

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-slate-400 animate-pulse">Loading funds...</div></div>;
  if (error) return <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">Error loading funds: {error}</div>;

  const items = Array.isArray(funds) ? funds : [];

  if (items.length === 0) {
    return <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400"><div className="text-4xl mb-3">🏦</div><p>No funds found</p></div>;
  }

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">All Funds</h1>
      <div className="space-y-3">
        {items.map((fund) => (
          <div key={fund.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white truncate max-w-[140px]">{safeString(fund.plan_name, '—')}</span>
                <StatusBadge status={fund.status} />
              </div>
              <span className="text-sm font-bold text-white">{fund.locked_principal}</span>
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div><span className="text-slate-500">User:</span> {fund.user_id}</div>
              <div><span className="text-slate-500">APY:</span> <span className="text-emerald-300">{fund.apy || '—'}%</span></div>
              <div><span className="text-slate-500">Day:</span> {fund.current_day}/{fund.total_days}</div>
              <div><span className="text-slate-500">Date:</span> {new Date(fund.created_at).toLocaleDateString()}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
