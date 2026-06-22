import { useEmployeeData } from '../../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function WithdrawalsTab({ userId }) {
  const { data: withdrawals, loading } = useEmployeeData(`/admin/withdrawals?user_id=${userId}`);
  
  if (loading) return <div className="text-slate-400">Loading withdrawals...</div>;
  
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
          {withdrawals?.length === 0 ? (
            <tr><td colSpan="5" className="px-4 py-6 text-center text-slate-500">No withdrawals.</td></tr>
          ) : (
            withdrawals?.map((wd) => (
              <tr key={wd.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                <td className="px-4 py-3 text-white">{wd.coin || 'USDT'}</td>
                <td className="px-4 py-3 text-white">{wd.amount}</td>
                <td className="px-4 py-3 text-slate-300 truncate max-w-[120px]">{wd.address || '—'}</td>
                <td className="px-4 py-3"><StatusBadge status={wd.status} /></td>
                <td className="px-4 py-3 text-slate-400 text-xs">{new Date(wd.created_at).toLocaleString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}