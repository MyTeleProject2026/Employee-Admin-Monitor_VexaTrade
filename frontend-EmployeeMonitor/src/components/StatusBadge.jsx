export default function StatusBadge({ status }) {
  const value = String(status || '').toLowerCase();
  
  const getStyles = () => {
    if (['active', 'completed', 'approved', 'success', 'read', 'win'].includes(value))
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
    if (['pending', 'processing', 'unread'].includes(value))
      return 'border-amber-500/20 bg-amber-500/10 text-amber-300';
    if (['blocked', 'rejected', 'failed', 'loss', 'cancelled'].includes(value))
      return 'border-red-500/20 bg-red-500/10 text-red-300';
    return 'border-white/10 bg-white/5 text-slate-300';
  };
  
  return (
    <span className={`rounded-full border px-2.5 py-1 text-[10px] font-medium ${getStyles()}`}>
      {String(status || '-').replaceAll('_', ' ')}
    </span>
  );
}