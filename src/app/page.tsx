import Link from "next/link";
import { Bell, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";
import { MatchCard } from "@/components/MatchCard";
import { getWorldCupData } from "@/lib/realData";
import { Match } from "@/lib/types";

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

function argentinaHour(value: string) {
  return Number(
    new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      hour12: false,
      hourCycle: "h23",
      timeZone: "America/Argentina/Buenos_Aires",
    }).format(new Date(value)),
  );
}

function addDays(date: string, days: number) {
  const [year, month, day] = date.split("-").map(Number);
  const value = new Date(Date.UTC(year, month - 1, day + days, 12));
  return value.toISOString().slice(0, 10);
}

function dayTitle(date: string, index: number) {
  if (index === 0) return "Hoy";
  if (index === 1) return "Manana";
  if (index === 2) return "Pasado manana";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    timeZone: "America/Argentina/Buenos_Aires",
    weekday: "long",
  }).format(new Date(`${date}T12:00:00Z`));
}

function isLateNightCarryover(match: Match, today: string) {
  const previousDay = addDays(today, -1);
  const kickoff = new Date(match.kickoffAt).getTime();
  const fourHours = 4 * 60 * 60 * 1000;
  return argentinaDate(match.kickoffAt) === previousDay && argentinaHour(match.kickoffAt) >= 23 && Date.now() <= kickoff + fourHours;
}

function belongsToVisibleDate(match: Match, date: string, index: number, today: string) {
  if (argentinaDate(match.kickoffAt) === date) return true;
  return index === 0 && isLateNightCarryover(match, today);
}

function visibleMatchGroups(matches: Match[]) {
  const today = todayInArgentina();
  const dates = [today, addDays(today, 1), addDays(today, 2)];
  const groups = dates.map((date, index) => ({
    date,
    title: dayTitle(date, index),
    matches: matches
      .filter((match) => belongsToVisibleDate(match, date, index, today))
      .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime()),
  }));

  if (groups.some((group) => group.matches.length)) return groups;

  const nextDates = Array.from(
    new Set(
      matches
        .filter((match) => match.status !== "finished")
        .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())
        .map((match) => argentinaDate(match.kickoffAt)),
    ),
  ).slice(0, 3);

  return nextDates.map((date, index) => ({
    date,
    title: dayTitle(date, index),
    matches: matches
      .filter((match) => argentinaDate(match.kickoffAt) === date)
      .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime()),
  }));
}

export default async function Home() {
  const { matches, teams, source, isLiveConnected } = await getWorldCupData();
  const matchGroups = visibleMatchGroups(matches);
  const liveCount = matches.filter((match) => match.status === "live").length;

  return (
    <main className="relative mx-auto max-w-6xl px-2 py-3 sm:px-4 sm:py-6 md:py-10">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="grid grid-cols-[30px_1fr_30px] items-center border-b border-emerald-100/15 px-2 py-3 sm:grid-cols-[44px_1fr_44px] sm:px-3 sm:py-4">
          <ChevronLeft className="text-white" size={20} />
          <h1 className="text-center text-sm font-black uppercase leading-tight text-white sm:text-lg">
            Hoy y proximos 2 dias <span className="text-lime-400">▼</span>
          </h1>
          <ChevronRight className="justify-self-end text-white" size={20} />
        </div>

        <div className="flex items-center justify-between gap-2 border-b border-emerald-100/15 px-3 py-2.5 sm:px-4 sm:py-3">
          <div className="flex gap-4 text-xs font-black uppercase sm:gap-5 sm:text-sm">
            <span className="text-lime-400">Todos</span>
            <span className="text-white">Vivo ({liveCount})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-md bg-[#007c19] px-3 py-2 text-xs font-black text-white sm:inline-flex">
              TV Argentina
            </span>
            <span className="grid size-9 place-items-center rounded-md bg-[#008f12] text-white sm:size-10">
              <Bell size={17} />
            </span>
          </div>
        </div>

        <div className="px-3 py-2.5 sm:px-4 sm:py-3">
          <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-100/70 sm:text-sm">
            <RefreshCw size={16} /> {isLiveConnected ? "Resultados en vivo" : "Fixture real"}
          </span>
        </div>

        <div className="px-0 pb-4">
          {matchGroups.map((group) => (
            <section key={group.date}>
              <div className="border-y border-emerald-100/20 bg-[#052617] px-3 py-2 text-xs font-black uppercase text-white sm:px-4 sm:text-sm">
                Mundial · {group.title} · {new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short" }).format(new Date(`${group.date}T12:00:00Z`))}
              </div>
              {group.matches.length ? (
                group.matches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)
              ) : (
                <div className="border-t border-emerald-100/20 px-4 py-5 text-sm font-bold text-emerald-100/65">
                  Sin partidos programados.
                </div>
              )}
            </section>
          ))}
        </div>
      </section>

      <section className="mt-4 flex flex-col gap-3 rounded-lg border border-emerald-100/15 bg-[#062f1d]/85 p-3 sm:mt-6 sm:p-4 md:flex-row md:items-center md:justify-between">
        <div className="min-w-0">
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
