import { FlagBadge } from "@/components/FlagBadge";
import { Team, TeamLineup } from "@/lib/types";

export function LineupPanel({ team, lineup }: { team: Team; lineup: TeamLineup }) {
  const starters = lineup.players.filter((player) => player.starter !== false);

  return (
    <section className="rounded-lg border border-emerald-100/15 bg-[#062f1d]/92 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-black text-white">
            <FlagBadge size="sm" team={team} />
            {team.name}
          </h2>
          <p className="text-sm text-sky-100/65">Formacion: {lineup.formation}</p>
        </div>
        <span className="rounded-md bg-[#052617] px-3 py-2 text-xs font-black uppercase text-lime-300">
          {lineup.source === "api" ? "Confirmada" : lineup.source === "seed" ? "Base local" : "Pendiente"}
        </span>
      </div>

      {starters.length ? (
        <div className="mt-4 grid gap-2">
          {starters.map((player) => (
            <div className="grid grid-cols-[1fr_auto] gap-3 rounded-md bg-[#052617] p-3" key={`${team.id}-${player.name}`}>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{player.name}</p>
                <p className="truncate text-sm text-emerald-100/60">{player.position}</p>
              </div>
              <div className="text-right text-sm">
                <p className="font-bold text-emerald-50">{player.currentClub}</p>
                <p className="text-emerald-100/55">{player.clubCountry}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-md bg-[#052617] p-4 text-sm text-emerald-100/70">
          Plantel y formacion disponibles al conectar API de lineups/jugadores.
        </div>
      )}
    </section>
  );
}
