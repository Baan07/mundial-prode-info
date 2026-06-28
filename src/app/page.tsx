import Link from "next/link";
import { CalendarDays, ChevronRight, Clock3, RadioTower, Tv } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";
import { FlagBadge } from "@/components/FlagBadge";
import { MatchCard } from "@/components/MatchCard";
import { channelLabel } from "@/lib/broadcast";
import { formatArgentinaTime, getTeamFromList, getWorldCupData } from "@/lib/realData";
import { Match, Team } from "@/lib/types";

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

function featuredMatch(matches: Match[]) {
  return matches.find((match) => match.status === "live")
    ?? matches.find((match) => match.status !== "finished")
    ?? matches[0];
}

function winProbabilities(home: Team, away: Team) {
  const total = Math.max(1, home.strengthRating + away.strengthRating);
  const draw = 24;
  const available = 100 - draw;
  const homeWin = Math.round((home.strengthRating / total) * available);
  const awayWin = 100 - draw - homeWin;
  return { homeWin, draw, awayWin };
}

function scoreLabel(match: Match) {
  if (match.homeScore !== undefined && match.awayScore !== undefined) return `${match.homeScore}-${match.awayScore}`;
  return "VS";
}

function Hero({ match, teams, source, isLiveConnected }: { match: Match; teams: Team[]; source: string; isLiveConnected: boolean }) {
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  if (!home || !away) return null;
  const probs = winProbabilities(home, away);

  return (
    <section className="stadium-hero">
      <div className="broadcast-shell">
        <div className="hero-scoreboard">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className={`status-chip ${match.status === "live" ? "live" : ""}`}>
              {match.status === "live" ? <RadioTower size={15} /> : <CalendarDays size={15} />}
              {match.status === "live" ? "Transmision en vivo" : "Partido destacado"}
            </span>
            <span className="text-xs font-black uppercase tracking-[0.18em] text-white/58">
              Fuente: {source} - {isLiveConnected ? "actualiza cada 30s" : "fixture conectado"}
            </span>
          </div>

          <div>
            <p className="section-kicker">Centro de cobertura Mundial 2026</p>
            <h1 className="section-title max-w-4xl">La previa, el vivo y los numeros en una sola pantalla</h1>
          </div>

          <Link className="hero-match-grid" href={`/partido/${match.id}`}>
            <div className="hero-team">
              <FlagBadge size="xl" team={home} />
              <h2 className="hero-team-name font-display">{home.name}</h2>
              <span className="text-sm font-bold text-white/62">{home.group ? `Grupo ${home.group}` : match.phase}</span>
            </div>

            <div className="hero-score animate-score-pop">
              <span>{scoreLabel(match)}</span>
            </div>

            <div className="hero-team">
              <FlagBadge size="xl" team={away} />
              <h2 className="hero-team-name font-display">{away.name}</h2>
              <span className="text-sm font-bold text-white/62">{away.group ? `Grupo ${away.group}` : match.phase}</span>
            </div>
          </Link>

          <div className="grid gap-4 lg:grid-cols-[1fr_1.4fr_1fr] lg:items-end">
            <div className="grid gap-2 text-sm font-bold text-white/68">
              <span className="flex items-center gap-2"><Clock3 size={17} className="text-[#d9a441]" /> {formatArgentinaTime(match.kickoffAt)} ARG</span>
              <span className="flex items-center gap-2"><Tv size={17} className="text-[#d9a441]" /> {channelLabel(match)}</span>
            </div>

            <div className="probability-rail">
              <div className="flex justify-between text-xs font-black uppercase tracking-[0.14em] text-white/62">
                <span>{home.name} {probs.homeWin}%</span>
                <span>Empate {probs.draw}%</span>
                <span>{away.name} {probs.awayWin}%</span>
              </div>
              <div className="probability-track">
                <span className="bg-[#1db46a]" style={{ width: `${probs.homeWin}%` }} />
                <span className="bg-[#f4f1e8]" style={{ width: `${probs.draw}%` }} />
                <span className="bg-[#d9a441]" style={{ width: `${probs.awayWin}%` }} />
              </div>
            </div>

            <Link className="broadcast-button justify-self-start px-5 py-3 text-sm font-black uppercase lg:justify-self-end" href={`/partido/${match.id}`}>
              Abrir partido <ChevronRight className="inline" size={17} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function Home() {
  const { matches, teams, source, isLiveConnected } = await getWorldCupData();
  const matchGroups = visibleMatchGroups(matches);
  const featured = featuredMatch(matches);
  const liveCount = matches.filter((match) => match.status === "live").length;
  const finishedCount = matches.filter((match) => match.status === "finished").length;

  return (
    <main>
      <AutoRefresh seconds={30} />
      {featured ? <Hero match={featured} teams={teams} source={source} isLiveConnected={isLiveConnected} /> : null}

      <section className="content-stage">
        <div className="mb-6 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <p className="section-kicker">Match feed</p>
            <h2 className="section-title">Partidos</h2>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-[0.12em] text-white/70 sm:grid-cols-3">
            <span className="bg-white/[0.07] px-3 py-2">Live {liveCount}</span>
            <span className="bg-white/[0.07] px-3 py-2">Final {finishedCount}</span>
            <span className="hidden bg-white/[0.07] px-3 py-2 sm:block">ARG 24 hs</span>
          </div>
        </div>

        <div className="grid gap-6">
          {matchGroups.map((group) => (
            <section className="grid gap-3" key={group.date}>
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="section-kicker">Mundial 2026</p>
                  <h3 className="font-display text-4xl leading-none">{group.title}</h3>
                </div>
                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/44">
                  {new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short" }).format(new Date(`${group.date}T12:00:00Z`))}
                </span>
              </div>
              {group.matches.length ? (
                <div className="grid gap-4">
                  {group.matches.map((match) => <MatchCard match={match} teams={teams} key={match.id} />)}
                </div>
              ) : (
                <div className="match-broadcast">
                  <p className="text-sm font-bold text-white/62">Sin partidos programados.</p>
                </div>
              )}
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}
