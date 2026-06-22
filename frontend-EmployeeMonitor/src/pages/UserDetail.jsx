import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye } from 'lucide-react';
import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from './components/StatusBadge';

export default function UsersList() {
  const navigate = useNavigate();
  const { data: users, loading, error } = useEmployeeData('/api/admin/users');
  const [search, setSearch] = useState('');

  const filteredUsers = Array.isArray(users)
    ? users.filter(u =>
        u.name?.toLowerCase().includes(search.toLowerCase()) ||
        u.email?.toLowerCase().includes(search.toLowerCase()) ||
        u.uid?.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        Error loading users: {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Users</h1>
        <input
          type="text"
          placeholder="Search by name, email, UID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-xl border border-white/10 bg-[#0a0e1a] px-4 py-2 text-sm text-white outline-none focus:border-cyan-500 w-full sm:w-64"
        />
      </div>

      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-[#050812]">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Name</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">UID</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Email</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3 text-right text-slate-400 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-4 py-6 text-center text-slate-500">No users found.</td>
              </tr>
            ) : (
              filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{user.name || '—'}</td>
                  <td className="px-4 py-3 text-slate-300">{user.uid || '—'}</td>
                  <td className="px-4 py-3 text-slate-300">{user.email || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={user.status || 'Active'} /></td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => navigate(`/users/${user.id}`)}
                      className="inline-flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-3 py-1.5 text-xs font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
