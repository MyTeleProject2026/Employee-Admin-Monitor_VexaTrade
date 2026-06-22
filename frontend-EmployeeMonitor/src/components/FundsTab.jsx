import { useEmployeeData } from '../../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function FundsTab({ userId }) {
  const { data: funds, loading } = useEmployeeData(`/admin/funds?user_id=${userId}`);
  
  if (loading) return <div className="text-slate-400">Loading funds...</div>;
  
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-[#050812]">
          <tr>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Plan</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Amount</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">APY</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Day</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {funds?.length === 0 ? (
            <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No fund applications.</td></tr>
          ) : (
            funds?.map((fund) => (
              <tr key={fund.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
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
  );
}