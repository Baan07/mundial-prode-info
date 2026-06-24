import { matches, getTeam, players } from "@/lib/data";

export function ProdePredictionForm() {
  return (
    <form className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
      <h3 className="text-lg font-bold text-white">Cargar prediccion</h3>
      <div className="mt-4 grid gap-3">
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50">
          {matches.map((match) => <option key={match.id}>{getTeam(match.homeTeamId)?.name} vs {getTeam(match.awayTeamId)?.name}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50" type="number" min="0" placeholder="Local" />
          <input className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50" type="number" min="0" placeholder="Visitante" />
        </div>
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50">
          <option>Goleador opcional</option>
          {players.map((player) => <option key={player.id}>{player.name}</option>)}
        </select>
        <button className="rounded-md bg-sky-400 px-4 py-3 font-black text-slate-950" type="button">Guardar prediccion</button>
      </div>
    </form>
  );
}
