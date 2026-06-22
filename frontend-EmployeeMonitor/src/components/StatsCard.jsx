export default function StatsCard({ label, value, icon: Icon, tone = 'text-white' }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-4 shadow-md">
      <div className="flex items-center gap-2 text-sm text-slate-400">
        <Icon size={18} />
        <span>{label}</span>
      </div>
      <div className={`mt-1 text-2xl font-bold ${tone}`}>{value}</div>
    </div>
  );
}