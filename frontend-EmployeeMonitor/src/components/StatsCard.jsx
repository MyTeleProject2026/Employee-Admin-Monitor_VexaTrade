export default function StatsCard({ label, value, icon: Icon, tone = 'text-white' }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-3 sm:p-4 shadow-md hover:border-white/20 transition">
      <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400">
        <Icon size={16} className="shrink-0" />
        <span className="truncate">{label}</span>
      </div>
      <div className={`mt-1 text-lg sm:text-2xl font-bold ${tone}`}>{value}</div>
    </div>
  );
}
