import { AutoRefresh } from "@/components/AutoRefresh";
import { MatchCard } from "@/components/MatchCard";
import { StandingsTable } from "@/components/StandingsTable";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function FixturePage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();
  const groupMatches = matches.filter((match) => match.phase === "Fase de grupos");
  const knockoutMatches = matches.filter((match) => match.phase !== "Fase de grupos");
  const groups = [...new Set(teams.map((team) => team.group).filter(Boolean))].sort();

  return (
    <main className="relative mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-6">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="border-b border-emerald-100/15 px-3 py-3 sm:px-4 sm:py-4">
          <p className="text-sm font-black uppercase tracking-wide text-lime-400">
            {isLiveConnected ? "Resultados en vivo cada 30s" : "Fixture real · TV Argentina"}
          </p>
          <h1 className="mt-1 text-2xl font-black uppercase text-white sm:text-3xl">Fixture Mundial 2026</h1>
        </div>

        <div className="grid gap-2 border-b border-emerald-100/15 p-3 sm:grid-cols-3 sm:p-4">
          <select className="min-w-0 rounded-md border border-emerald-100/15 bg-[#052617] p-2.5 text-sm text-white sm:p-3">
            <option>Todos los grupos</option>
            {groups.map((group) => (
              <option key={group}>Grupo {group}</option>
            ))}
          </select>
          <select className="min-w-0 rounded-md border border-emerald-100/15 bg-[#052617] p-2.5 text-sm text-white sm:p-3">
            <option>Todas las selecciones</option>
            {teams.map((team) => (
              <option key={team.id}>{team.name}</option>
            ))}
          </select>
          <select className="min-w-0 rounded-md border border-emerald-100/15 bg-[#052617] p-2.5 text-sm text-white sm:p-3">
            <option>Todos</option>
            <option>Por jugar</option>
            <option>En vivo</option>
            <option>Final</option>
          </select>
        </div>

        <div className="border-b border-emerald-100/15 bg-[#041f13] px-3 py-3 sm:px-4 sm:py-4">
          <div className="mb-3 text-xs font-black uppercase text-lime-400 sm:text-sm">Tabla de posiciones por zona</div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {groups.map((group) => (
              <StandingsTable group={group} key={group} teams={teams.filter((team) => team.group === group)} />
            ))}
          </div>
        </div>

        <div>
          <div className="border-y border-emerald-100/20 bg-[#052617] px-3 py-2 text-xs font-black uppercase text-white sm:px-4 sm:text-sm">
            🏆 Fase de grupos
          </div>
          {groupMatches.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>

        <div>
          <div className="border-y border-emerald-100/20 bg-[#052617] px-3 py-2 text-xs font-black uppercase text-white sm:px-4 sm:text-sm">
            🏆 Eliminacion directa
          </div>
          {knockoutMatches.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
