export default function StatusBadge({ status }) {
  // Safe string conversion
  const value = typeof status === 'string' ? status.toLowerCase() : '';

  const getStyles = () => {
    if (['active', 'completed', 'approved', 'success', 'read', 'win'].includes(value))
      return 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300';
    if (['pending', 'processing', 'unread'].includes(value))
      return 'border-amber-500/20 bg-amber-500/10 text-amber-300';
    if (['blocked', 'rejected', 'failed', 'loss', 'cancelled'].includes(value))
      return 'border-red-500/20 bg-red-500/10 text-red-300';
    return 'border-white/10 bg-white/5 text-slate-300';
  };

  // Format status for display
  const displayText = typeof status === 'string' && status.length > 0
    ? String(status).replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase())
    : '-';

  return (
    <span className={`rounded-full border px-2 py-0.5 text-[9px] sm:text-[10px] font-medium ${getStyles()}`}>
      {displayText}
    </span>
  );
}
