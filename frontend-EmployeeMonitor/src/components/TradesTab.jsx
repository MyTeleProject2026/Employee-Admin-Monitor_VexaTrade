import { useEmployeeData } from '../../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function TradesTab({ userId }) {
  const { data: allTrades, loading, error } = useEmployeeData('/api/admin/trades');
  
  const trades = Array.isArray(allTrades) 
    ? allTrades.filter(t => t.user_id === parseInt(userId))
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-slate-400 animate-pulse">Loading trades...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400">Error loading trades: {error}</div>;
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="border-b border-white/10 bg-[#050812]">
          <tr>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Pair</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Direction</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Amount</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Profit/Loss</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
            <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
          </tr>
        </thead>
        <tbody>
          {trades.length === 0 ? (
            <tr><td colSpan="6" className="px-4 py-6 text-center text-slate-500">No trades
