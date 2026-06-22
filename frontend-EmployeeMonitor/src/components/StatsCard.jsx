export default function StatsCard({ label, value, icon: Icon, tone = 'text-white', subtext = '' }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#0a0e1a] p-3 sm:p-4 shadow-md hover:border-white/20 transition">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-white/[0.03] text-slate-300 shrink-0">
          <Icon size={16} className="sm:size-[18px]" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-[10px] sm:text-xs text-slate-400 truncate">{label}</div>
          <div className={`text-base sm:text-2xl font-bold ${tone} truncate`}>{value}</div>
          {subtext && <div className="text-[8px] sm:text-[10px] text-slate-500 truncate">{subtext}</div>}
        </div>
      </div>
    </div>
  );
}
