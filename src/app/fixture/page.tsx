import { AutoRefresh } from "@/components/AutoRefresh";
import { FixtureExplorer } from "@/components/FixtureExplorer";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function FixturePage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();
  const groups = [...new Set(teams.map((team) => team.group).filter(Boolean))].sort();

  return (
    <main className="content-stage pt-24">
      <AutoRefresh seconds={30} />
      <section className="mb-7">
        <p className="section-kicker">{isLiveConnected ? "Resultados en vivo cada 30s" : "Fixture real - TV Argentina"}</p>
        <h1 className="section-title">Fixture Mundial 2026</h1>
        <p className="mt-2 max-w-2xl text-sm font-bold text-white/58">Filtros, grupos y cruces dentro del centro de cobertura.</p>
      </section>

      <FixtureExplorer groups={groups} matches={matches} teams={teams} />
    </main>
  );
}
