import { useEmployeeData } from '../../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function NotificationsTab({ userId }) {
  const { data: notifications, loading } = useEmployeeData(`/admin/notifications?user_id=${userId}`);
  
  if (loading) return <div className="text-slate-400">Loading notifications...</div>;
  
  return (
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
          {notifications?.length === 0 ? (
            <tr><td colSpan="4" className="px-4 py-6 text-center text-slate-500">No notifications.</td></tr>
          ) : (
            notifications?.map((notif) => (
              <tr key={notif.id} className="border-b border-white/5 last:border-0 hover:bg-white/5">
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
  );
}