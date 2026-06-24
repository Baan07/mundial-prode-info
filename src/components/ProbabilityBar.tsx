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
      <div className="flex overflow-hidden rounded-md border border-white/10 bg-slate-950">
        <div className="bg-sky-400 py-2 text-center text-xs font-bold text-slate-950" style={{ width: `${home}%` }}>{home}%</div>
        <div className="bg-white py-2 text-center text-xs font-bold text-slate-950" style={{ width: `${draw}%` }}>{draw}%</div>
        <div className="bg-cyan-700 py-2 text-center text-xs font-bold text-white" style={{ width: `${away}%` }}>{away}%</div>
      </div>
      <div className="grid grid-cols-3 text-xs text-sky-100/70">
        <span>Local</span>
        <span className="text-center">Empate</span>
        <span className="text-right">Visitante</span>
      </div>
    </div>
  );
}
