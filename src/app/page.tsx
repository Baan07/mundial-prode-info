import Link from "next/link";
import { RefreshCw } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";
import { MatchCard } from "@/components/MatchCard";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

function nextMatches<T extends { kickoffAt: string; status: string }>(matches: T[]) {
  const live = matches.filter((match) => match.status === "live");
  const upcoming = matches
    .filter((match) => match.status === "scheduled")
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
  return [...live, ...upcoming].slice(0, 9);
}

export default async function Home() {
  const { matches, teams, source, isLiveConnected } = await getWorldCupData();
  const visibleMatches = nextMatches(matches);

  return (
    <main className="mx-auto max-w-7xl px-4 py-5 md:py-8">
      <AutoRefresh seconds={30} />
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-300">Mundial 2026 · hora Argentina 24 hs</p>
          <h1 className="mt-2 text-3xl font-black text-white md:text-5xl">Partidos a jugar</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.06] px-3 py-2 text-sm font-bold text-sky-50">
            <RefreshCw size={16} /> {isLiveConnected ? "Live conectado" : "Fixtures reales"}
          </span>
        </div>
      </section>

      <section className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleMatches.map((match) => (
          <MatchCard match={match} teams={teams} key={match.id} />
        ))}
      </section>

      <section className="mt-8 flex flex-col gap-3 rounded-lg border border-white/10 bg-white/[0.045] p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold text-white">Fuente: {source}</p>
          <p className="mt-1 text-sm text-sky-100/65">
            Para resultados, goles, jugadores y formaciones confirmadas en vivo, cargar `FOOTBALL_API_KEY` en Netlify.
          </p>
        </div>
        <Link className="rounded-md bg-white px-4 py-2 text-center text-sm font-black text-slate-950" href="/fixture">
          Ver fixture completo
        </Link>
      </section>
    </main>
  );
}
