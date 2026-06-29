import { AutoRefresh } from "@/components/AutoRefresh";
import { ScorerTable } from "@/components/ScorerTable";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;
export const dynamic = "force-dynamic";

export default async function ScorersPage() {
  const { matches, teams, isLiveConnected } = await getWorldCupData();

  return (
    <main className="content-stage pt-24">
      <AutoRefresh seconds={30} />
      <section className="mb-7">
        <p className="section-kicker">{isLiveConnected ? "Goles actualizados cada 30s" : "Goles cargados"}</p>
        <h1 className="section-title">Goleadores de la Copa</h1>
      </section>
      <ScorerTable matches={matches} teams={teams} />
    </main>
  );
}
