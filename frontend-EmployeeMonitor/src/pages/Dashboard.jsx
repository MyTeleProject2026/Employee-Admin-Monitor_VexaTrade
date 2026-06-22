import { useEmployeeData } from '../hooks/useEmployeeData';
import StatsCard from '../components/StatsCard';
import { Users, Wallet, TrendingUp, Landmark, Bell } from 'lucide-react';

export default function Dashboard() {
  const { data: stats, loading, error } = useEmployeeData('/api/admin/dashboard-stats');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        <p>Error loading dashboard: {error}</p>
        <p className="text-sm text-slate-400 mt-2">Make sure you're logged in with admin token.</p>
      </div>
    );
  }

  const data = stats || {};

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard label="Total Users" value={data.totalUsers || 0} icon={Users} />
        <StatsCard label="Pending Deposits" value={data.pendingDeposits || 0} icon={Wallet} tone="text-amber-300" />
        <StatsCard label="Active Trades" value={data.totalTrades || 0} icon={TrendingUp} tone="text-cyan-300" />
        <StatsCard label="Active Funds" value={data.totalFunds || 0} icon={Landmark} tone="text-emerald-300" />
        <StatsCard label="New Alerts" value={data.pendingWithdrawals || 0} icon={Bell} tone="text-violet-300" />
      </div>
    </div>
  );
}
