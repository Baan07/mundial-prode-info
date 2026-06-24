import { getTeam, players } from "@/lib/data";

export function ScorerTable() {
  const rows = [...players].sort((a, b) => b.goals - a.goals || b.assists - a.assists).slice(0, 10);
  return (
    <div className="overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="bg-white/[0.07] text-xs uppercase text-sky-100/65">
          <tr><th className="p-3">Jugador</th><th>Seleccion</th><th>Club</th><th>G</th><th>A</th><th>Min</th><th>Prom.</th></tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {rows.map((player) => {
            const team = getTeam(player.teamId);
            const average = player.minutes ? (player.goals / player.minutes * 90).toFixed(2) : "0.00";
            return (
              <tr key={player.id} className="text-sky-50">
                <td className="p-3 font-semibold">{player.name}</td>
                <td>{team?.flag} {team?.name}</td>
                <td>{player.currentClub}</td>
                <td>{player.goals}</td>
                <td>{player.assists}</td>
                <td>{player.minutes}</td>
                <td>{average}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
