import { AutoRefresh } from "@/components/AutoRefresh";
import { MatchCard } from "@/components/MatchCard";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function FixturePage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();
  const groupMatches = matches.filter((match) => match.phase === "Fase de grupos");
  const knockoutMatches = matches.filter((match) => match.phase !== "Fase de grupos");

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AutoRefresh seconds={30} />
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-300">
            {isLiveConnected ? "Resultados live cada 30s" : "Fixture real · conectar API para goles y formaciones live"}
          </p>
          <h1 className="mt-2 text-4xl font-black text-white">Fixture 2026</h1>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50">
            <option>Todos los grupos</option>
            {[...new Set(teams.map((team) => team.group).filter(Boolean))].map((group) => (
              <option key={group}>Grupo {group}</option>
            ))}
          </select>
          <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50">
            <option>Todas las selecciones</option>
            {teams.map((team) => (
              <option key={team.id}>{team.name}</option>
            ))}
          </select>
          <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50">
            <option>Todos</option>
            <option>Por jugar</option>
            <option>En vivo</option>
            <option>Final</option>
          </select>
        </div>
      </div>

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-black text-white">Fase de grupos</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {groupMatches.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-xl font-black text-white">Eliminacion directa</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {knockoutMatches.map((match) => (
            <MatchCard compact match={match} teams={teams} key={match.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
