import { useEffect, useState } from 'react';
import { Users, Wallet, TrendingUp, Landmark, Bell } from 'lucide-react';
import StatsCard from './components/StatsCard';
import { useEmployeeData } from '../hooks/useEmployeeData';

export default function Dashboard() {
  const { data: stats, loading } = useEmployeeData('/admin/stats'); // adjust to your endpoint
  
  if (loading) return <div className="text-slate-400">Loading stats...</div>;
  
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatsCard label="Total Users" value={stats?.totalUsers || 0} icon={Users} />
        <StatsCard label="Pending Deposits" value={stats?.pendingDeposits || 0} icon={Wallet} tone="text-amber-300" />
        <StatsCard label="Active Trades" value={stats?.activeTrades || 0} icon={TrendingUp} tone="text-cyan-300" />
        <StatsCard label="Active Funds" value={stats?.activeFunds || 0} icon={Landmark} tone="text-emerald-300" />
        <StatsCard label="New Alerts" value={stats?.newNotifications || 0} icon={Bell} tone="text-violet-300" />
      </div>
    </div>
  );
}