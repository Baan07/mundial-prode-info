import { FlagBadge } from "@/components/FlagBadge";
import { Team, TeamLineup } from "@/lib/types";

export function LineupPanel({ team, lineup }: { team: Team; lineup: TeamLineup }) {
  const starters = lineup.players.filter((player) => player.starter !== false);

  return (
    <section className="broadcast-card overflow-hidden rounded-2xl">
      <div className="scoreboard-topline px-3 py-2 text-xs font-black uppercase sm:px-4">
        Formacion oficial
      </div>
      <div className="p-3 sm:p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex min-w-0 items-center gap-2 text-lg font-black text-white sm:text-xl">
            <FlagBadge size="sm" team={team} />
            <span className="min-w-0 truncate">{team.name}</span>
          </h2>
          <p className="text-sm text-stone-300/70">Formacion: {lineup.formation}</p>
        </div>
        <span className="shrink-0 rounded-xl bg-[#d8ff3f] px-2 py-1.5 text-[10px] font-black uppercase text-[#101312] sm:px-3 sm:py-2 sm:text-xs">
          {lineup.source === "api" ? "Plantel API" : lineup.source === "seed" ? "Base local" : "Pendiente"}
        </span>
      </div>

      {starters.length ? (
        <div className="mt-4 grid gap-2">
          {starters.map((player) => (
            <div className="grid min-w-0 gap-1 rounded-xl bg-[#0c1110] p-3 sm:grid-cols-[minmax(0,1fr)_minmax(110px,auto)] sm:gap-3" key={`${team.id}-${player.name}`}>
              <div className="min-w-0">
                <p className="truncate font-bold text-white">{player.name}</p>
                <p className="truncate text-sm text-stone-300/65">{player.position}</p>
              </div>
              <div className="min-w-0 text-sm sm:text-right">
                <p className="truncate font-bold text-stone-50">{player.currentClub}</p>
                <p className="truncate text-stone-300/55">{player.clubCountry}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-xl bg-[#0c1110] p-4 text-sm text-stone-300/70">
          Plantel y formacion disponibles al conectar API de lineups/jugadores.
        </div>
      )}
      </div>
    </section>
  );
}
