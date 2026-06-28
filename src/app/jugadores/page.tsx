import { FlagBadge } from "@/components/FlagBadge";
import { getWorldCupData } from "@/lib/realData";
import { getFallbackPlayers } from "@/lib/squads";

export const revalidate = 1800;

export default async function PlayersPage() {
  const { teams } = await getWorldCupData();
  const players = getFallbackPlayers();

  return (
    <main className="mx-auto max-w-7xl px-2 py-3 sm:px-4 sm:py-6">
      <div className="sports-panel broadcast-field rounded-2xl p-4 sm:p-6">
      <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="font-display text-5xl leading-none text-white sm:text-6xl">Jugadores</h1>
          <p className="mt-2 text-stone-300/70">Nombre, seleccion, posicion y club actual.</p>
        </div>
        <span className="rounded-xl bg-[#f2efe4] px-3 py-2 text-sm font-black text-[#101312]">
          {players.length} jugadores cargados
        </span>
      </div>
      </div>

      <section className="mt-4 grid gap-2 md:hidden">
        {players.map((player) => {
          const team = teams.find((item) => item.id === player.teamId);
          return (
            <article className="broadcast-card rounded-2xl p-3" key={`${player.teamId}-${player.name}-card`}>
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="truncate font-black text-white">{player.name}</p>
                  <p className="text-sm text-stone-300/65">{player.position}</p>
                </div>
                {team ? <FlagBadge size="sm" team={team} /> : null}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div className="min-w-0 rounded-xl bg-[#0c1110] p-2">
                  <p className="text-[10px] font-black uppercase text-stone-300/50">Seleccion</p>
                  <p className="truncate font-bold text-white">{team?.name ?? player.teamId}</p>
                </div>
                <div className="min-w-0 rounded-xl bg-[#0c1110] p-2">
                  <p className="text-[10px] font-black uppercase text-stone-300/50">Club</p>
                  <p className="truncate font-bold text-white">{player.currentClub}</p>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <section className="broadcast-card mt-6 hidden overflow-x-auto rounded-2xl md:block">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-[#f2efe4] text-xs uppercase text-[#101312]/70">
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
                <tr className="text-stone-50" key={`${player.teamId}-${player.name}`}>
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
