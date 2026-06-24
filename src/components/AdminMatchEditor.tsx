import { matches, getTeam } from "@/lib/data";

export function AdminMatchEditor() {
  return (
    <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
      <h3 className="text-lg font-bold text-white">Editor de partidos</h3>
      <div className="mt-4 grid gap-3">
        {matches.slice(0, 5).map((match) => (
          <div className="grid gap-2 rounded-md bg-slate-950/70 p-3 md:grid-cols-[1fr_100px_100px_130px] md:items-center" key={match.id}>
            <span className="text-sm font-semibold text-sky-50">{getTeam(match.homeTeamId)?.name} vs {getTeam(match.awayTeamId)?.name}</span>
            <input className="rounded-md border border-white/10 bg-slate-900 p-2 text-sky-50" placeholder="Local" />
            <input className="rounded-md border border-white/10 bg-slate-900 p-2 text-sky-50" placeholder="Visita" />
            <select className="rounded-md border border-white/10 bg-slate-900 p-2 text-sky-50" defaultValue={match.status}>
              <option value="scheduled">Programado</option>
              <option value="live">En vivo</option>
              <option value="finished">Finalizado</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
