import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from '../components/StatusBadge';

export default function NotificationsList() {
  const { data: notifications, loading, error } = useEmployeeData('/api/admin/notifications');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-slate-400 animate-pulse">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-red-300">
        Error loading notifications: {error}
      </div>
    );
  }

  const items = Array.isArray(notifications) ? notifications : [];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">All Notifications</h1>
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="border-b border-white/10 bg-[#050812]">
            <tr>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Title</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Message</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Status</th>
              <th className="px-4 py-3 text-left text-slate-400 font-medium">Date</th>
            </tr>
          </thead>
          <tbody>
            {items.length === 0 ? (
              <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">No notifications found.</td></tr>
            ) : (
              items.map((notif, index) => (
                <tr key={notif.id || index} className="border-b border-white/5 last:border-0 hover:bg-white/5">
                  <td className="px-4 py-3 text-white">{notif.title || '—'}</td>
                  <td className="px-4 py-3 text-slate-300 max-w-xs truncate">{notif.message || '—'}</td>
                  <td className="px-4 py-3"><StatusBadge status={notif.is_read ? 'Read' : 'Unread'} /></td>
                  <td className="px-4 py-3 text-slate-400 text-xs">{new Date(notif.created_at).toLocaleString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
