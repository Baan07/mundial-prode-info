import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, MapPin, Tv } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";
import { FlagBadge } from "@/components/FlagBadge";
import { LineupPanel } from "@/components/LineupPanel";
import { StatBadge } from "@/components/StatBadge";
import { channelLabel, channelNote } from "@/lib/broadcast";
import { formatArgentinaTime, getLineup, getRealMatch, getTeamFromList } from "@/lib/realData";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 30;

const statusBadgeClass = {
  scheduled: "bg-white/10 text-white",
  live: "bg-lime-400 text-green-950",
  finished: "bg-slate-200 text-slate-900",
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { match, teams } = await getRealMatch(id);
  if (!match) return { title: "Partido no encontrado" };
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  return {
    title: `${home?.name} vs ${away?.name} | MundialData`,
    description: `${home?.name} vs ${away?.name}: horario Argentina, estadio, estado, planteles y formaciones.`,
  };
}

export default async function MatchPage({ params }: Props) {
  const { id } = await params;
  const { match, teams } = await getRealMatch(id);
  if (!match) notFound();
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  if (!home || !away) notFound();

  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const homeScorers = match.homeScorers ?? [];
  const awayScorers = match.awayScorers ?? [];
  const homeLineup = await getLineup(home.id);
  const awayLineup = await getLineup(away.id);

  return (
    <main className="relative mx-auto max-w-5xl px-2 py-3 sm:px-4 sm:py-6">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#062f1d]/95 shadow-2xl shadow-black/30">
        <div className="flex items-center justify-between gap-3 border-b border-emerald-100/15 px-3 py-3 sm:px-4">
          <p className="min-w-0 truncate text-[11px] font-black uppercase tracking-wide text-lime-400 sm:text-xs">
            #{match.matchNumber} · {match.group ? `Grupo ${match.group}` : match.phase}
          </p>
          <span className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-black sm:px-3 sm:text-sm ${statusBadgeClass[match.status]}`}>
            {match.status === "live" ? "En vivo" : match.status === "finished" ? "Final" : "Por jugar"}
          </span>
        </div>

        <div className="grid grid-cols-[minmax(0,1fr)_56px_minmax(0,1fr)] items-center gap-2 px-3 py-5 sm:grid-cols-[minmax(0,1fr)_86px_minmax(0,1fr)] sm:gap-3 sm:px-4 sm:py-8">
          <div className="min-w-0">
            <FlagBadge size="lg" team={home} />
            <h1 className="mt-2 truncate text-xl font-black text-white sm:mt-3 sm:text-2xl md:text-4xl">{home.name}</h1>
            {homeScorers.length ? (
              <div className="mt-2 flex flex-col items-start gap-1">
                {homeScorers.map((scorer) => (
                  <span className="max-w-full truncate rounded-md bg-[#052617] px-2 py-1 text-[11px] font-bold text-lime-100 sm:text-xs" key={scorer}>
                    {scorer}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
          <div className="rounded-lg bg-slate-950 px-2 py-3 text-center sm:px-5 sm:py-4">
            {hasScore ? (
              <div className="text-2xl font-black text-white sm:text-5xl">
                {match.homeScore}-{match.awayScore}
              </div>
            ) : (
              <div className="text-lg font-black text-sky-200 sm:text-2xl">VS</div>
            )}
          </div>
          <div className="min-w-0 text-right">
            <div className="flex justify-end">
              <FlagBadge size="lg" team={away} />
            </div>
            <h2 className="mt-2 truncate text-xl font-black text-white sm:mt-3 sm:text-2xl md:text-4xl">{away.name}</h2>
            {awayScorers.length ? (
              <div className="mt-2 flex flex-col items-end gap-1">
                {awayScorers.map((scorer) => (
                  <span className="max-w-full truncate rounded-md bg-[#052617] px-2 py-1 text-[11px] font-bold text-lime-100 sm:text-xs" key={scorer}>
                    {scorer}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid gap-2 border-t border-emerald-100/15 px-3 py-3 text-sm text-emerald-100/80 sm:px-4 sm:py-4 md:grid-cols-3">
          <span className="flex min-w-0 items-center gap-2">
            <CalendarClock className="shrink-0" size={17} /> <span className="min-w-0 truncate">{formatArgentinaTime(match.kickoffAt)} ARG</span>
          </span>
          <span className="flex min-w-0 items-center gap-2">
            <MapPin className="shrink-0" size={17} /> <span className="min-w-0 truncate">{match.stadium}, {match.city}</span>
          </span>
          <span className="flex min-w-0 items-center gap-2 md:justify-end">
            <Tv className="shrink-0" size={17} /> <span className="min-w-0 truncate">{channelLabel(match)}</span>
          </span>
        </div>
      </section>

      <section className="mt-3 grid gap-2 sm:mt-5 sm:grid-cols-3 sm:gap-4">
        <StatBadge label="Local" value={home.name} />
        <StatBadge label="Visitante" value={away.name} />
        <StatBadge label="TV" value={channelNote(match, teams)} />
      </section>

      <section className="mt-3 grid gap-3 sm:mt-5 sm:gap-4 lg:grid-cols-2">
        <LineupPanel lineup={homeLineup} team={home} />
        <LineupPanel lineup={awayLineup} team={away} />
      </section>
    </main>
  );
}
