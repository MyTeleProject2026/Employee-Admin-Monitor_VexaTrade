import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function FundsTab({ userId }) {
  const { data: allFunds, loading, error } = useEmployeeData('/api/admin/funds');
  const funds = Array.isArray(allFunds) ? allFunds.filter(f => f.user_id === parseInt(userId)) : [];

  if (loading) return <div className="flex items-center justify-center h-32"><div className="text-slate-400 animate-pulse">Loading funds...</div></div>;
  if (error) return <div className="text-red-400">Error loading funds: {error}</div>;
  if (funds.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
        <div className="text-4xl mb-3">🏦</div>
        <p>No fund applications</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {funds.map((fund) => (
        <div key={fund.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white truncate max-w-[140px]">{typeof fund.plan_name === 'string' ? fund.plan_name : '—'}</span>
              <StatusBadge status={fund.status} />
            </div>
            <span className="text-sm font-bold text-white">{fund.locked_principal}</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div><span className="text-slate-500">APY:</span> <span className="text-emerald-300">{fund.apy || '—'}%</span></div>
            <div><span className="text-slate-500">Day:</span> <span className="text-white">{fund.current_day}/{fund.total_days}</span></div>
            <div className="col-span-2"><span className="text-slate-500">Date:</span> {new Date(fund.created_at).toLocaleString()}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
