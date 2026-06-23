import { useEmployeeData } from '../hooks/useEmployeeData';
import StatusBadge from './StatusBadge';

export default function NotificationsTab({ userId }) {
  const { data: notifications, loading, error } = useEmployeeData('/api/admin/notifications');

  if (loading) {
    return (
      <div className="flex items-center justify-center h-32">
        <div className="text-slate-400 animate-pulse">Loading notifications...</div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400">Error loading notifications: {error}</div>;
  }

  const items = Array.isArray(notifications) ? notifications : [];

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-8 text-center text-slate-400">
        <div className="text-4xl mb-3">🔔</div>
        <p>No notifications found</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((notif, index) => (
        <div key={notif.id || index} className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-semibold text-white truncate">{notif.title || '—'}</span>
                <StatusBadge status={notif.is_read ? 'Read' : 'Unread'} />
              </div>
              <p className="mt-1 text-sm text-slate-300 break-words">{notif.message || '—'}</p>
              <p className="mt-1 text-xs text-slate-500">{new Date(notif.created_at).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
