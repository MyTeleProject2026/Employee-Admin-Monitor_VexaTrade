import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';

export default function TradesList() {
  const { data: trades, loading, error } = useEmployeeData('/api/admin/trades');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading trades...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        Error loading trades: {error}
      </div>
    );
  }

  const items = Array.isArray(trades) ? trades : [];

  return (
    <div>
      <h1 className="text-xl sm:text-2xl font-bold mb-4">All Trades</h1>

      {items.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
          <div className="text-4xl mb-3">📈</div>
          <p>No trades found</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((trade) => {
            const profit = Number(trade.profit || 0);
            return (
              <div key={trade.id} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{trade.pair || '—'}</span>
                    <span className="text-xs text-slate-400 capitalize">{trade.direction || '—'}</span>
                  </div>
                  <StatusBadge status={trade.status || trade.result} />
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs">
                  <div>
                    <span className="text-slate-500">User:</span> <span className="text-white">{trade.user_id}</span>
                  </div>
                  <div>
                    <span className="text-slate-500">Amount:</span> <span className="text-white">{trade.amount}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Profit/Loss:</span>{' '}
                    <span className={profit >= 0 ? 'text-emerald-300' : 'text-red-300'}>
                      {profit >= 0 ? '+' : ''}{profit.toFixed(2)}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className="text-slate-500">Date:</span>{' '}
                    <span className="text-white">{new Date(trade.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
