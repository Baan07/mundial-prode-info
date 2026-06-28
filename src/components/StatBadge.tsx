export function StatBadge({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#151a18] px-3 py-2">
      <div className="text-[11px] font-black uppercase tracking-wide text-stone-300/65">{label}</div>
      <div className="break-words text-base font-black leading-tight text-white sm:text-lg">{value}</div>
    </div>
  );
}
