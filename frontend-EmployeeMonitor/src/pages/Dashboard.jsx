import { useEmployeeData } from '../hooks/useEmployeeData';
import StatsCard from '../components/StatsCard';
import { Users, Wallet, TrendingUp, Landmark, Bell, Activity } from 'lucide-react';

export default function Dashboard() {
  const { data: stats, loading, error } = useEmployeeData('/api/admin/dashboard-stats');

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-slate-400 animate-pulse">Loading dashboard...</div></div>;
  if (error) return <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300"><p className="font-semibold">Error loading dashboard</p><p className="text-sm mt-1">{error}</p><button onClick={() => window.location.reload()} className="mt-3 px-4 py-2 rounded-lg bg-cyan-500 text-black text-sm font-semibold hover:bg-cyan-400 transition">Retry</button></div>;

  const data = stats || {};
  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
        <div><h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1><p className="text-sm text-slate-400">Monitor all user activity in real-time</p></div>
        <div className="flex items-center gap-2 text-xs text-slate-500 bg-[#0a0e1a] px-3 py-1.5 rounded-full border border-white/10"><Activity size={12} className="text-emerald-400 animate-pulse" /><span>Live</span></div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <StatsCard label="Total Users" value={data.totalUsers || 0} icon={Users} />
        <StatsCard label="Pending Deposits" value={data.pendingDeposits || 0} icon={Wallet} tone="text-amber-300" />
        <StatsCard label="Active Trades" value={data.totalTrades || 0} icon={TrendingUp} tone="text-cyan-300" />
        <StatsCard label="Active Funds" value={data.totalFunds || 0} icon={Landmark} tone="text-emerald-300" />
        <StatsCard label="New Alerts" value={data.pendingWithdrawals || 0} icon={Bell} tone="text-violet-300" />
      </div>
    </div>
  );
}
