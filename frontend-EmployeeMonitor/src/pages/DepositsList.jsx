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
      <h1 className="text-2xl font-bold mb-6">All Deposits</h1>
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-[#050812]">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">User ID</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Coin</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Amount</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Address</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No deposits found.</td></tr>
            ) : (
              items.map((dep) => (
                <tr key={dep.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{dep.user_id}</td>
                  <td className="px-4 py-3 text-white">{dep.coin || 'USDT'}</td>
                  <td className="px-4 py-3 text-white">{dep.amount}</td>
                  <td className="px-4 py-3 text-slate-300 truncate max-w-[100px]">{dep.address || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={dep.status} /></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(dep.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
