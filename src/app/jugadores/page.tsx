import { getWorldCupData } from "@/lib/realData";
import { getFallbackPlayers } from "@/lib/squads";

export const revalidate = 1800;

export default async function PlayersPage() {
  const { teams } = await getWorldCupData();
  const players = getFallbackPlayers();

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-4xl font-black text-white">Jugadores</h1>
          <p className="mt-2 text-sky-100/65">Nombre, seleccion, posicion y club actual.</p>
        </div>
        <span className="rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-sky-50">
          {players.length} jugadores cargados
        </span>
      </div>

      <section className="mt-6 overflow-hidden rounded-lg border border-white/10">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-white/[0.07] text-xs uppercase text-sky-100/65">
            <tr>
              <th className="p-3">Jugador</th>
              <th>Seleccion</th>
              <th>Posicion</th>
              <th>Club</th>
              <th>Pais club</th>
              <th>Formacion</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {players.map((player) => {
              const team = teams.find((item) => item.id === player.teamId);
              return (
                <tr className="text-sky-50" key={`${player.teamId}-${player.name}`}>
                  <td className="p-3 font-bold text-white">{player.name}</td>
                  <td>{team?.flag} {team?.name ?? player.teamId}</td>
                  <td>{player.position}</td>
                  <td>{player.currentClub}</td>
                  <td>{player.clubCountry}</td>
                  <td>{player.formation}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </main>
  );
}
