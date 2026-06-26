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
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="border-b border-emerald-100/15 px-3 py-3 sm:px-4 sm:py-4">
          <p className="text-sm font-black uppercase tracking-wide text-lime-400">
            {isLiveConnected ? "Resultados en vivo cada 30s" : "Fixture real - TV Argentina"}
          </p>
          <h1 className="mt-1 text-2xl font-black uppercase text-white sm:text-3xl">Fixture Mundial 2026</h1>
        </div>

        <FixtureExplorer groups={groups} matches={matches} teams={teams} />
      </section>
    </main>
  );
}
