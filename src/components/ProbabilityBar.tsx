export function ProbabilityBar({
  home,
  draw,
  away,
}: {
  home: number;
  draw: number;
  away: number;
}) {
  return (
    <div className="space-y-2">
      <div className="flex overflow-hidden rounded-xl border border-white/10 bg-[#0c1110]">
        <div className="bg-[#d8ff3f] py-2 text-center text-xs font-black text-[#101312]" style={{ width: `${home}%` }}>{home}%</div>
        <div className="bg-[#f2efe4] py-2 text-center text-xs font-black text-[#101312]" style={{ width: `${draw}%` }}>{draw}%</div>
        <div className="bg-[#b91c1c] py-2 text-center text-xs font-black text-white" style={{ width: `${away}%` }}>{away}%</div>
      </div>
      <div className="grid grid-cols-3 text-xs font-bold text-stone-300/70">
        <span>Local</span>
        <span className="text-center">Empate</span>
        <span className="text-right">Visitante</span>
      </div>
    </div>
  );
}
