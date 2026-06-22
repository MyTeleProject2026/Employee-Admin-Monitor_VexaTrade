import { useEmployeeData } from '../../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function DepositsTab({ userId }) {
  const { data: deposits, loading } = useEmployeeData(`/admin/deposits?user_id=${userId}`);
  
  if (loading) return <div className="text-slate-400">Loading deposits...</div>;
  
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-[#050812]">
          <tr>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Coin</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Amount</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Address</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Tx Image</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {deposits?.length === 0 ? (
            <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No deposits.</td></tr>
          ) : (
            deposits?.map((dep) => (
              <tr key={dep.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-4 py-3 text-white">{dep.coin || 'USDT'}</td>
                <td className="px-4 py-3 text-white">{dep.amount}</td>
                <td className="px-4 py-3 text-slate-300 truncate max-w-[120px]">{dep.address || '—'}</td>
                <td className="px-4 py-3">
                  {dep.tx_image ? (
                    <img src={dep.tx_image} alt="tx" className="h-10 w-10 rounded object-cover border border-white/10" />
                  ) : '—'}
                </td>
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