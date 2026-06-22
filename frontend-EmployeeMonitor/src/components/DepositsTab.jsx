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

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-[#050812]">
          <tr>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Coin</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Amount</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Address</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {deposits.length === 0 ? (
            <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-500">No deposits.</td></tr>
          ) : (
            deposits.map((dep) => (
              <tr key={dep.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-4 py-3 text-white">{dep.coin || 'USDT'}</td>
                <td className="px-4 py-3 text-white">{dep.amount}</td>
                <td className="px-4 py-3 text-slate-300 truncate max-w-[120px]">{dep.address || '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={dep.status} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(dep.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
