export function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="broadcast-card px-3 py-3">
      <div className="text-[11px] font-black uppercase tracking-[0.14em] text-white/45">{label}</div>
      <div className="break-words font-display text-3xl leading-none text-white">{value}</div>
    </div>
  );
}
