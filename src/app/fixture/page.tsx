import { AutoRefresh } from "@/components/AutoRefresh";
import { FixtureExplorer } from "@/components/FixtureExplorer";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function FixturePage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();
  const groups = [...new Set(teams.map((team) => team.group).filter(Boolean))].sort();

  return (
    <main className="relative mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-6">
      <AutoRefresh seconds={30} />
      <section className="sports-panel overflow-hidden rounded-2xl">
        <div className="scoreboard-topline px-3 py-2 text-xs font-black uppercase sm:px-4">
          MundialData Fixture Center
        </div>
        <div className="border-b border-emerald-100/15 px-3 py-3 sm:px-4 sm:py-4">
          <p className="text-sm font-black uppercase tracking-wide text-lime-400">
            {isLiveConnected ? "Resultados en vivo cada 30s" : "Fixture real - TV Argentina"}
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase leading-none text-white sm:text-5xl">Fixture Mundial 2026</h1>
        </div>

        <FixtureExplorer groups={groups} matches={matches} teams={teams} />
      </section>
    </main>
  );
}
