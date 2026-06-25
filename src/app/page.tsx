import Link from "next/link";
import { Bell, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";
import { MatchCard } from "@/components/MatchCard";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 30;

function argentinaDate(value: string) {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
  }).format(new Date(value));
}

function todayInArgentina() {
  return new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    month: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
    year: "numeric",
  }).format(new Date());
}

function visibleMatches<T extends { kickoffAt: string; status: string }>(matches: T[]) {
  const today = todayInArgentina();
  const todayMatches = matches.filter((match) => argentinaDate(match.kickoffAt) === today);
  if (todayMatches.length) return todayMatches;

  const live = matches.filter((match) => match.status === "live");
  const upcoming = matches
    .filter((match) => match.status === "scheduled")
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
  return [...live, ...upcoming].slice(0, 10);
}

export default async function Home() {
  const { matches, teams, source, isLiveConnected } = await getWorldCupData();
  const matchesToShow = visibleMatches(matches);
  const liveCount = matches.filter((match) => match.status === "live").length;

  return (
    <main className="relative mx-auto max-w-6xl px-4 py-6 md:py-10">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="grid grid-cols-[44px_1fr_44px] items-center border-b border-emerald-100/15 px-3 py-4">
          <ChevronLeft className="text-white" />
          <h1 className="text-center text-lg font-black uppercase text-white">
            {matchesToShow.length ? "Partidos de hoy" : "Proximos partidos"} <span className="text-lime-400">▼</span>
          </h1>
          <ChevronRight className="justify-self-end text-white" />
        </div>

        <div className="flex items-center justify-between gap-3 border-b border-emerald-100/15 px-4 py-3">
          <div className="flex gap-5 text-sm font-black uppercase">
            <span className="text-lime-400">Todos</span>
            <span className="text-white">Vivo ({liveCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-md bg-[#007c19] px-3 py-2 text-xs font-black text-white sm:inline-flex">
              TV Argentina
            </span>
            <span className="grid size-10 place-items-center rounded-md bg-[#008f12] text-white">
              <Bell size={17} />
            </span>
          </div>
        </div>

        <div className="px-4 py-3">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-emerald-100/70">
            <RefreshCw size={16} /> {isLiveConnected ? "Resultados en vivo" : "Fixture real"}
          </span>
        </div>

        <div className="px-0 pb-4">
          <div className="border-y border-emerald-100/20 bg-[#052617] px-4 py-2 text-sm font-black uppercase text-white">
            🏆 Mundial
          </div>
          {matchesToShow.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>
      </section>

      <section className="mt-6 flex flex-col gap-3 rounded-lg border border-emerald-100/15 bg-[#062f1d]/85 p-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-bold text-white">Fuente: {source}</p>
          <p className="mt-1 text-sm text-emerald-100/65">Horarios en Argentina, formato 24 hs. Canales sujetos a grilla oficial.</p>
        </div>
        <Link className="rounded-md bg-lime-500 px-4 py-2 text-center text-sm font-black text-green-950" href="/fixture">
          Fixture completo
        </Link>
      </section>
    </main>
  );
}
