// src/components/TradesTab.jsx
import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';
import { safeString } from '../utils/helpers';

export default function TradesTab({ userId }) {
  const { data: allTrades, loading, error } = useEmployeeData('/api/admin/trades');
  const trades = Array.isArray(allTrades) ? allTrades.filter(t => t.user_id === parseInt(userId)) : [];

  if (loading) return <div className="flex items-center justify-center h-32"><div className="text-slate-400 animate-pulse">Loading trades...</div></div>;
  if (error) return <div className="text-red-400">Error loading trades: {error}</div>;
  if (trades.length === 0) {
    return <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400"><div className="text-4xl mb-3">📈</div><p>No trades found</p></div>;
  }

  return (
    <div className="space-y-3">
      {trades.map((trade) => {
        const profit = Number(trade.profit || 0);
        return (
          <div key={trade.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-white">{safeString(trade.pair, '—')}</span>
                <span className="text-xs text-slate-400 capitalize">{safeString(trade.direction, '—')}</span>
              </div>
              <StatusBadge status={trade.status || trade.result} />
            </div>
            <div className="grid grid-cols-2 gap-1 text-xs">
              <div><span className="text-slate-500">Amount:</span> <span className="text-white">{trade.amount}</span></div>
              <div><span className="text-slate-500">Profit/Loss:</span> <span className={profit >= 0 ? 'text-emerald-300' : 'text-red-300'}>{profit >= 0 ? '+' : ''}{profit.toFixed(2)}</span></div>
              <div className="col-span-2"><span className="text-slate-500">Date:</span> {new Date(trade.created_at).toLocaleString()}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
