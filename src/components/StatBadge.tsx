export function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2">
      <div className="text-[11px] uppercase tracking-wide text-sky-100/65">{label}</div>
      <div className="text-lg font-semibold text-white">{value}</div>
    </div>
  );
}
