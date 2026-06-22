import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Search } from 'lucide-react';
import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';

export default function UsersList() {
  const navigate = useNavigate();
  const { data: users, loading, error } = useEmployeeData('/api/admin/users');
  const [search, setSearch] = useState('');

  const filteredUsers = Array.isArray(users)
    ? users.filter(u => {
        const name = (u?.name || '').toLowerCase();
        const email = (u?.email || '').toLowerCase();
        const uid = (u?.uid || '').toLowerCase();
        const term = (search || '').toLowerCase();
        return name.includes(term) || email.includes(term) || uid.includes(term);
      })
    : [];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="text-slate-400 animate-pulse">Loading users...</div></div>;
  if (error) return <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">Error loading users: {error}</div>;

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h1 className="text-xl sm:text-2xl font-bold">Monitored Users</h1>
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value || '')}
            className="w-full sm:w-56 rounded-xl border border-white/10 bg-[#0a0e1a] pl-9 pr-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {filteredUsers.length === 0 ? (
        <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
          <div className="text-4xl mb-3">👤</div>
          <p>No users found</p>
          <p className="text-xs mt-1">Add users from User Management page</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredUsers.map((user) => (
            <div key={user?.id || Math.random()} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4 hover:border-white/20 transition">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-white truncate">{user?.name || '—'}</span>
                    <StatusBadge status={user?.status || 'Active'} />
                  </div>
                  <div className="mt-1 text-xs text-slate-400">
                    <span className="font-mono">{user?.uid || '—'}</span>
                    <span className="mx-2">•</span>
                    <span className="truncate">{user?.email || '—'}</span>
                  </div>
                </div>
                <button
                  onClick={() => navigate(`/users/${user?.id}`)}
                  className="shrink-0 ml-3 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
                >
                  <Eye size={14} className="inline mr-1" /> View
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
