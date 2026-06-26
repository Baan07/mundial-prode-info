import { AutoRefresh } from "@/components/AutoRefresh";
import { ScorerTable } from "@/components/ScorerTable";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

export default async function ScorersPage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();

  return (
    <main className="relative mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-6">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="border-b border-emerald-100/15 px-3 py-3 sm:px-4 sm:py-4">
          <p className="text-sm font-black uppercase tracking-wide text-lime-400">
            {isLiveConnected ? "Goles actualizados cada 30s" : "Goles cargados"}
          </p>
          <h1 className="mt-1 text-2xl font-black uppercase text-white sm:text-3xl">Goleadores de la Copa</h1>
        </div>
        <div className="p-3 sm:p-4">
          <ScorerTable matches={matches} teams={teams} />
        </div>
      </section>
    </main>
  );
}
