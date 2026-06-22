
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
      <h1 className="text-2xl font-bold mb-6">All Funds</h1>
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-[#050812]">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">User ID</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Plan</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Amount</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">APY</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Day</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="7" className="px-4 py-6 text-center text-slate-500">No funds found.</td></tr>
            ) : (
              items.map((fund) => (
                <tr key={fund.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{fund.user_id}</td>
                  <td className="px-4 py-3 text-white">{fund.plan_name || '—'}</td>
                  <td className="px-4 py-3 text-white">{fund.locked_principal}</td>
                  <td className="px-4 py-3 text-emerald-300">{fund.apy || '—'}%</td>
                  <td className="px-4 py-3 text-white">{fund.current_day}/{fund.total_days}</td>
                  <td className="px-4 py-3"><StatusBadge status={fund.status} /></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(fund.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
