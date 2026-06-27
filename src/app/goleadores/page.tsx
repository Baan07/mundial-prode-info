import { AutoRefresh } from "@/components/AutoRefresh";
import { ScorerTable } from "@/components/ScorerTable";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function ScorersPage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();

  return (
    <main className="relative mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-6">
      <AutoRefresh seconds={30} />
      <section className="sports-panel overflow-hidden rounded-2xl">
        <div className="scoreboard-topline px-3 py-2 text-xs font-black uppercase sm:px-4">
          MundialData Scoring Leaders
        </div>
        <div className="border-b border-emerald-100/15 px-3 py-3 sm:px-4 sm:py-4">
          <p className="text-sm font-black uppercase tracking-wide text-lime-400">
            {isLiveConnected ? "Goles actualizados cada 30s" : "Goles cargados"}
          </p>
          <h1 className="mt-1 font-display text-4xl uppercase leading-none text-white sm:text-5xl">Goleadores de la Copa</h1>
        </div>
        <div className="p-3 sm:p-4">
          <ScorerTable matches={matches} teams={teams} />
        </div>
      </section>
    </main>
  );
}
