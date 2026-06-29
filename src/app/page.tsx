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

function fullDayTitle(date: string) {
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

  const groupsWithMatches = groups.filter((group) => group.matches.length);
  if (groupsWithMatches.length) return groupsWithMatches;

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

function isKnockoutFromRoundOf32(match: Match) {
  return match.phase !== "Fase de grupos";
}

function upcomingKnockoutMatches(matches: Match[], limit = 3) {
  return matches
    .filter((match) => isKnockoutFromRoundOf32(match))
    .filter((match) => match.status !== "finished")
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime())
    .slice(0, limit);
}

function hasRealScore(match: Match) {
  return match.homeScore !== undefined && match.awayScore !== undefined;
}

function liveAndTodayResults(matches: Match[]) {
  const today = todayInArgentina();
  return matches
    .filter((match) => match.status === "live" || (hasRealScore(match) && match.status === "finished" && belongsToVisibleDate(match, today, 0, today)))
    .sort((a, b) => new Date(a.kickoffAt).getTime() - new Date(b.kickoffAt).getTime());
}

export default async function Home() {
  const { matches, teams } = await getWorldCupData();
  const liveResults = liveAndTodayResults(matches);
  const liveResultIds = new Set(liveResults.map((match) => match.id));
  const visibleMatches = upcomingKnockoutMatches(matches.filter((match) => !liveResultIds.has(match.id)), 3);
  const matchGroups = visibleMatchGroups(visibleMatches);
  const liveCount = liveResults.filter((match) => match.status === "live").length;
  const finishedTodayCount = liveResults.filter((match) => match.status === "finished").length;
  const scheduledCount = visibleMatches.filter((match) => match.status === "scheduled").length;

  return (
    <main>
      <AutoRefresh seconds={30} />

      <section className="content-stage pt-24">
        <section className="mb-10 grid gap-4">
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="section-kicker">Actualiza cada 30s</p>
              <h2 className="section-title">En vivo y resultados de hoy</h2>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-[0.12em] text-white/70 sm:grid-cols-3">
              <span className="bg-[#ef233c] px-3 py-2 text-white">Live {liveCount}</span>
              <span className="bg-white/[0.07] px-3 py-2">Final {finishedTodayCount}</span>
              <span className="hidden bg-white/[0.07] px-3 py-2 sm:block">Con goleadores</span>
            </div>
          </div>

          {liveResults.length ? (
            <div className="grid gap-4">
              {liveResults.map((match) => <MatchCard match={match} teams={teams} key={`live-${match.id}`} />)}
            </div>
          ) : (
            <div className="broadcast-empty">
              <span>No hay partidos en vivo ni finalizados hoy.</span>
              <small>Los marcadores y goleadores aparecen aca cuando el feed trae eventos del partido.</small>
            </div>
          )}
        </section>

        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="section-kicker">Desde 16avos</p>
            <h2 className="section-title">Proximos 3 partidos</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-[0.12em] text-white/70 sm:grid-cols-3">
            <span className="bg-white/[0.07] px-3 py-2">Live {liveCount}</span>
            <span className="bg-white/[0.07] px-3 py-2">A jugar {scheduledCount}</span>
            <span className="hidden bg-white/[0.07] px-3 py-2 sm:block">ARG 24 hs</span>
          </div>
        </div>

        <div className="grid gap-6">
          {matchGroups.map((group) => (
            <section className="grid gap-3" key={group.date}>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="section-kicker">{group.title}</p>
                  <h3 className="font-display text-4xl leading-none capitalize">{fullDayTitle(group.date)}</h3>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/44">
                  {new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short" }).format(new Date(`${group.date}T12:00:00Z`))}
                </span>
              </div>
              <div className="grid gap-4">
                {group.matches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
