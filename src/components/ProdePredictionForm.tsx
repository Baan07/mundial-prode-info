import { matches, getTeam, players } from "@/lib/data";

export function ProdePredictionForm() {
  return (
    <form className="broadcast-card rounded-2xl p-4">
      <p className="text-xs font-black uppercase tracking-wide text-[#d8ff3f]">Zona prode</p>
      <h3 className="mt-1 text-xl font-black text-white">Cargar prediccion</h3>
      <div className="mt-4 grid gap-3">
        <select className="broadcast-input rounded-xl p-3">
          {matches.map((match) => <option key={match.id}>{getTeam(match.homeTeamId)?.name} vs {getTeam(match.awayTeamId)?.name}</option>)}
        </select>
        <div className="grid grid-cols-2 gap-3">
          <input className="broadcast-input rounded-xl p-3" type="number" min="0" placeholder="Local" />
          <input className="broadcast-input rounded-xl p-3" type="number" min="0" placeholder="Visitante" />
        </div>
        <select className="broadcast-input rounded-xl p-3">
          <option>Goleador opcional</option>
          {players.map((player) => <option key={player.id}>{player.name}</option>)}
        </select>
        <button className="broadcast-button rounded-xl px-4 py-3 font-black uppercase" type="button">Guardar prediccion</button>
      </div>
    </form>
  );
}
