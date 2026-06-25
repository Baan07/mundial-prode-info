import { AutoRefresh } from "@/components/AutoRefresh";
import { MatchCard } from "@/components/MatchCard";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function FixturePage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();
  const groupMatches = matches.filter((match) => match.phase === "Fase de grupos");
  const knockoutMatches = matches.filter((match) => match.phase !== "Fase de grupos");

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-6">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="border-b border-emerald-100/15 px-4 py-4">
          <p className="text-sm font-black uppercase tracking-wide text-lime-400">
            {isLiveConnected ? "Resultados en vivo cada 30s" : "Fixture real · TV Argentina"}
          </p>
          <h1 className="mt-1 text-3xl font-black uppercase text-white">Fixture Mundial 2026</h1>
        </div>

        <div className="grid gap-2 border-b border-emerald-100/15 p-4 sm:grid-cols-3">
          <select className="rounded-md border border-emerald-100/15 bg-[#052617] p-3 text-white">
            <option>Todos los grupos</option>
            {[...new Set(teams.map((team) => team.group).filter(Boolean))].map((group) => (
              <option key={group}>Grupo {group}</option>
            ))}
          </select>
          <select className="rounded-md border border-emerald-100/15 bg-[#052617] p-3 text-white">
            <option>Todas las selecciones</option>
            {teams.map((team) => (
              <option key={team.id}>{team.name}</option>
            ))}
          </select>
          <select className="rounded-md border border-emerald-100/15 bg-[#052617] p-3 text-white">
            <option>Todos</option>
            <option>Por jugar</option>
            <option>En vivo</option>
            <option>Final</option>
          </select>
        </div>

        <div>
          <div className="border-y border-emerald-100/20 bg-[#052617] px-4 py-2 text-sm font-black uppercase text-white">
            🏆 Fase de grupos
          </div>
          {groupMatches.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>

        <div>
          <div className="border-y border-emerald-100/20 bg-[#052617] px-4 py-2 text-sm font-black uppercase text-white">
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
