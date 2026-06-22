import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, Wallet, ArrowUpCircle, TrendingUp, Landmark, Bell } from 'lucide-react';
import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';
import UserOverview from '../components/UserOverview';
import DepositsTab from '../components/DepositsTab';
import WithdrawalsTab from '../components/WithdrawalsTab';
import TradesTab from '../components/TradesTab';
import FundsTab from '../components/FundsTab';
import NotificationsTab from '../components/NotificationsTab';

const tabs = [
  { key: 'overview', label: 'Overview', icon: User },
  { key: 'deposits', label: 'Deposits', icon: Wallet },
  { key: 'withdrawals', label: 'Withdrawals', icon: ArrowUpCircle },
  { key: 'trades', label: 'Trades', icon: TrendingUp },
  { key: 'funds', label: 'Funds', icon: Landmark },
  { key: 'notifications', label: 'Notifications', icon: Bell },
];

export default function UserDetail() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const { data: user, loading, error } = useEmployeeData(`/api/admin/users/${userId}`);

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-slate-400 animate-pulse">Loading user details...</div></div>;
  if (error) return <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">Error loading user: {error}</div>;
  if (!user) return <div className="text-red-400">User not found.</div>;

  const userName = user?.name || 'Unnamed User';
  const userUid = user?.uid || '—';
  const userEmail = user?.email || '—';
  const userStatus = user?.status || 'Active';
  const userBalance = user?.balance || '0.00';

  return (
    <div>
      <button onClick={() => navigate('/users')} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white mb-4 transition">
        <ArrowLeft size={16} /> Back to Users
      </button>
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4 mb-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-white">{userName}</h1>
            <div className="flex flex-wrap items-center gap-2 mt-1 text-sm text-slate-400">
              <span className="font-mono text-xs">{userUid}</span>
              <span className="hidden sm:inline">•</span>
              <span className="truncate max-w-[180px] sm:max-w-none">{userEmail}</span>
              <span className="hidden sm:inline">•</span>
              <StatusBadge status={userStatus} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wallet size={16} className="text-cyan-400" />
            <span className="text-white font-semibold">{userBalance} USDT</span>
          </div>
        </div>
      </div>
      <div className="flex overflow-x-auto gap-1 border-b border-white/10 mb-4 pb-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap border-b-2 transition ${activeTab === tab.key ? 'border-cyan-400 text-cyan-400' : 'border-transparent text-slate-400 hover:text-white'}`}
          >
            <tab.icon size={15} className="sm:size-16" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>
      <div>
        {activeTab === 'overview' && <UserOverview user={user} />}
        {activeTab === 'deposits' && <DepositsTab userId={userId} />}
        {activeTab === 'withdrawals' && <WithdrawalsTab userId={userId} />}
        {activeTab === 'trades' && <TradesTab userId={userId} />}
        {activeTab === 'funds' && <FundsTab userId={userId} />}
        {activeTab === 'notifications' && <NotificationsTab userId={userId} />}
      </div>
    </div>
  );
}
