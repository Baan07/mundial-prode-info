import { FlagBadge } from "@/components/FlagBadge";
import { getWorldCupData } from "@/lib/realData";
import { getFallbackPlayers } from "@/lib/squads";

export const revalidate = 1800;

export default async function PlayersPage() {
  const { teams } = await getWorldCupData();
  const players = getFallbackPlayers();

  return (
    <main className="mx-auto max-w-7xl px-2 py-3 sm:px-4 sm:py-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-black text-white sm:text-4xl">Jugadores</h1>
          <p className="mt-2 text-sky-100/65">Nombre, seleccion, posicion y club actual.</p>
        </div>
        <span className="rounded-md bg-white/10 px-3 py-2 text-sm font-bold text-sky-50">
          {players.length} jugadores cargados
        </span>
      </div>

      <section className="mt-4 grid gap-2 md:hidden">
        {players.map((player) => {
          const team = teams.find((item) => item.id === player.teamId);
          return (
            <article className="rounded-lg border border-white/10 bg-white/[0.04] p-3" key={`${player.teamId}-${player.name}-card`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-black text-white">{player.name}</p>
                  <p className="text-sm text-emerald-100/65">{player.position}</p>
                </div>
                {team ? <FlagBadge size="sm" team={team} /> : null}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="min-w-0 rounded-md bg-[#052617] p-2">
                  <p className="text-[10px] font-black uppercase text-emerald-100/45">Seleccion</p>
                  <p className="truncate font-bold text-white">{team?.name ?? player.teamId}</p>
                </div>
                <div className="min-w-0 rounded-md bg-[#052617] p-2">
                  <p className="text-[10px] font-black uppercase text-emerald-100/45">Club</p>
                  <p className="truncate font-bold text-white">{player.currentClub}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="mt-6 hidden overflow-x-auto rounded-lg border border-white/10 md:block">
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
                  <td>
                    {team ? (
                      <span className="flex items-center gap-2">
                        <FlagBadge size="sm" team={team} />
                        {team.name}
                      </span>
                    ) : (
                      player.teamId
                    )}
                  </td>
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
