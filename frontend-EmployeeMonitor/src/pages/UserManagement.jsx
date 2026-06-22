import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserPlus, UserMinus, Eye, Users, X, Search } from 'lucide-react';
import apiClient from '../api/client';
import StatusBadge from '../components/StatusBadge';

export default function UserManagement() {
  const navigate = useNavigate();
  const [newUserUid, setNewUserUid] = useState('');
  const [adding, setAdding] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [assignedUsers, setAssignedUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const employeeId = localStorage.getItem('employeeId');

  useEffect(() => {
    loadAssignedUsers();
  }, []);

  const loadAssignedUsers = async () => {
    try {
      setLoading(true);
      const res = await apiClient.get(`/api/employee/assigned-users/${employeeId}`);
      if (res.data?.success) {
        setAssignedUsers(res.data.data || []);
      }
    } catch (err) {
      console.error('Failed to load assigned users:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setAdding(true);

    const uid = newUserUid.trim().toUpperCase();
    if (!uid) {
      setError('Please enter a user UID');
      setAdding(false);
      return;
    }

    try {
      const res = await apiClient.post('/api/employee/add-user', {
        employee_id: employeeId,
        user_uid: uid,
      });

      if (res.data?.success) {
        setSuccess(`User ${uid} added successfully!`);
        setNewUserUid('');
        loadAssignedUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add user');
    } finally {
      setAdding(false);
    }
  };

  const handleRemoveUser = async (userUid) => {
    if (!confirm(`Remove user ${userUid} from your monitoring list?`)) return;

    setRemoving(userUid);
    try {
      const res = await apiClient.delete('/api/employee/remove-user', {
        data: { employee_id: employeeId, user_uid: userUid },
      });

      if (res.data?.success) {
        setSuccess(`User ${userUid} removed successfully`);
        loadAssignedUsers();
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to remove user');
    } finally {
      setRemoving(null);
    }
  };

  const filteredUsers = assignedUsers.filter(user =>
    user.uid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading users...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">User Management</h1>
          <p className="text-sm text-slate-400">Add/remove users to monitor</p>
        </div>
        <button
          onClick={() => navigate('/users')}
          className="inline-flex items-center gap-2 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm font-medium text-cyan-300 hover:bg-cyan-500/20 transition"
        >
          <Eye size={16} /> View Monitored Users
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300">
          {success}
        </div>
      )}

      {/* Add User Form */}
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4 mb-6">
        <h2 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <UserPlus size={18} className="text-cyan-400" />
          Add User to Monitor
        </h2>
        <form onSubmit={handleAddUser} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <input
              type="text"
              value={newUserUid}
              onChange={(e) => setNewUserUid(e.target.value)}
              placeholder="Enter user UID (e.g., CP00240001)"
              className="w-full rounded-xl border border-white/10 bg-[#050812] px-4 py-2.5 text-sm text-white outline-none focus:border-cyan-500 transition"
            />
          </div>
          <button
            type="submit"
            disabled={adding}
            className="rounded-xl bg-cyan-500 px-6 py-2.5 text-sm font-semibold text-black hover:bg-cyan-400 transition disabled:opacity-60"
          >
            {adding ? 'Adding...' : 'Add User'}
          </button>
        </form>
        <p className="text-xs text-slate-500 mt-2">
          Once added, you'll be able to monitor this user's activity permanently.
        </p>
      </div>

      {/* Assigned Users List */}
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border-b border-white/10 gap-2">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Users size={18} className="text-cyan-400" />
            Monitored Users ({assignedUsers.length})
          </h2>
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full sm:w-48 rounded-lg border border-white/10 bg-[#050812] pl-8 pr-3 py-1.5 text-xs text-white outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {assignedUsers.length === 0 ? (
          <div className="p-8 text-center text-slate-400">
            <Users size={32} className="mx-auto mb-3 opacity-30" />
            <p>No users assigned yet</p>
            <p className="text-xs mt-1">Add a user UID above to start monitoring</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filteredUsers.map((user, index) => (
              <div key={user.id || user.uid} className="p-4 hover:bg-white/5 transition">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-semibold text-white">{user.name || '—'}</span>
                      <StatusBadge status={user.status || 'Unknown'} />
                    </div>
                    <div className="mt-1 text-xs text-slate-400">
                      <span className="font-mono">{user.uid}</span>
                      <span className="mx-2">•</span>
                      <span className="truncate">{user.email || '—'}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-500">
                      Added: {new Date(user.added_at).toLocaleDateString()}
                    </div>
                  </div>
                  <button
                    onClick={() => handleRemoveUser(user.uid)}
                    disabled={removing === user.uid}
                    className="shrink-0 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-medium text-red-300 hover:bg-red-500/20 transition disabled:opacity-50"
                  >
                    <UserMinus size={14} className="inline mr-1" /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
