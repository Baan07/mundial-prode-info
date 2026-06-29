import Link from "next/link";
import { Activity, Clock3, MapPin, RadioTower, Target, Tv } from "lucide-react";
import { FlagBadge } from "@/components/FlagBadge";
import { channelLabel } from "@/lib/broadcast";
import { formatArgentinaTime, getTeamFromList } from "@/lib/matchUtils";
import { Match, Team } from "@/lib/types";

function argentinaHourLabel(value: string) {
  return `${formatArgentinaTime(value).split(",").pop()?.trim() ?? formatArgentinaTime(value)} ARG`;
}

function displayLiveMinute(match: Match) {
  if (match.status !== "live") return undefined;
  if (match.liveMinute) return match.liveMinute;
  const elapsed = Math.floor((Date.now() - new Date(match.kickoffAt).getTime()) / 60000);
  return clamp(elapsed, 1, 120);
}

function statusText(match: Match) {
  const minute = displayLiveMinute(match);
  if (match.status === "live") return minute ? `${minute}' EN VIVO` : "EN VIVO";
  if (match.status === "finished") return "FINALIZADO";
  return "PREVIA";
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function matchMetrics(match: Match, home: Team, away: Team) {
  const homeEdge = home.strengthRating - away.strengthRating + (match.homeScore ?? 0) * 6 - (match.awayScore ?? 0) * 4;
  const possession = clamp(50 + Math.round(homeEdge / 2.8), 34, 66);
  const homeShots = clamp(Math.round(home.strengthRating / 8) + (match.homeScore ?? 0) * 2 + (match.status === "scheduled" ? 0 : 3), 3, 19);
  const awayShots = clamp(Math.round(away.strengthRating / 8) + (match.awayScore ?? 0) * 2 + (match.status === "scheduled" ? 0 : 3), 3, 19);
  const homeXg = (homeShots * 0.11 + (match.homeScore ?? 0) * 0.34).toFixed(1);
  const awayXg = (awayShots * 0.11 + (match.awayScore ?? 0) * 0.34).toFixed(1);
  return { possession, homeShots, awayShots, homeXg, awayXg };
}

function events(match: Match) {
  return [
    ...(match.homeScorers ?? []).map((value) => ({ side: "Local", value })),
    ...(match.awayScorers ?? []).map((value) => ({ side: "Visitante", value })),
  ].slice(0, 5);
}

function ScorerList({ scorers, side }: { scorers?: string[]; side: "local" | "visitante" }) {
  if (!scorers?.length) {
    return <p className="match-scorer-empty">Sin goles cargados</p>;
  }

  return (
    <div className="match-scorers">
      {scorers.slice(0, 4).map((scorer) => (
        <span className="match-scorer" key={`${side}-${scorer}`}>
          <span className="match-scorer-dot" />
          {scorer}
        </span>
      ))}
    </div>
  );
}

export function MatchCard({ match, teams }: { match: Match; teams: Team[]; compact?: boolean }) {
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  if (!home || !away) return null;

  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;
  const liveMinute = displayLiveMinute(match);
  const metrics = matchMetrics(match, home, away);
  const matchEvents = events(match);

  return (
    <Link className="block" href={`/partido/${match.id}`}>
      <article className={`match-broadcast animate-rise ${match.status}`}>
        <div className="match-card-header">
          <span className={`status-chip ${match.status === "live" ? "live" : ""}`}>
            {match.status === "live" ? <RadioTower size={14} /> : <Clock3 size={14} />}
            {statusText(match)}
          </span>
          <span className="match-date-time">{argentinaHourLabel(match.kickoffAt)}</span>
          <span className="text-right text-xs font-black uppercase tracking-[0.14em] text-white/50">
            {match.phase || (match.group ? `Grupo ${match.group}` : "Mundial")}
          </span>
        </div>

        <div className="match-mainline">
          <div className="match-team">
            <FlagBadge size="xl" team={home} />
            <h3 className="match-team-name">{home.name}</h3>
            <ScorerList scorers={match.homeScorers} side="local" />
          </div>

          <div className="match-scorebox animate-score-pop">
            <strong>{hasScore ? `${match.homeScore}-${match.awayScore}` : "VS"}</strong>
          </div>

          <div className="match-team away">
            <FlagBadge size="xl" team={away} />
            <h3 className="match-team-name">{away.name}</h3>
            <ScorerList scorers={match.awayScorers} side="visitante" />
          </div>
        </div>

        <div className="tv-overlay">
          <div className="grid gap-2 text-sm font-bold text-white/62 md:grid-cols-[1fr_auto_1fr] md:items-center">
            <span className="flex min-w-0 items-center gap-2"><MapPin size={16} className="shrink-0 text-[#d9a441]" /><span className="truncate">{match.stadium}, {match.city}</span></span>
            <span className="hidden h-px w-20 bg-white/15 md:block" />
            <span className="flex min-w-0 items-center gap-2 md:justify-end"><Tv size={16} className="shrink-0 text-[#d9a441]" /><span className="truncate">{channelLabel(match)}</span></span>
          </div>

          <div className="grid gap-2 sm:grid-cols-3">
            <div className="stat-lane">
              <span>{metrics.possession}%</span>
              <span className="stat-meter"><span style={{ width: `${metrics.possession}%` }} /></span>
              <span className="text-right">{100 - metrics.possession}%</span>
            </div>
            <div className="stat-lane">
              <span>{metrics.homeXg}</span>
              <span className="flex items-center justify-center gap-1 text-white/78"><Activity size={14} /> xG</span>
              <span className="text-right">{metrics.awayXg}</span>
            </div>
            <div className="stat-lane">
              <span>{metrics.homeShots}</span>
              <span className="flex items-center justify-center gap-1 text-white/78"><Target size={14} /> Tiros</span>
              <span className="text-right">{metrics.awayShots}</span>
            </div>
          </div>

          <div className="grid gap-2 border-t border-white/10 pt-3">
            <div className="relative h-2 overflow-hidden bg-white/10">
              <span className={`absolute top-0 h-full w-1.5 ${match.status === "live" ? "bg-[#ef233c]" : "bg-[#d9a441]"}`} style={{ left: match.status === "scheduled" ? "0%" : `${clamp(liveMinute ?? 90, 0, 90) / 90 * 100}%` }} />
            </div>
            <div className="flex flex-wrap gap-2 text-xs font-bold text-white/58">
              {matchEvents.length ? matchEvents.map((event) => (
                <span className="bg-white/[0.08] px-2 py-1" key={`${event.side}-${event.value}`}>{event.side}: {event.value}</span>
              )) : <span>Timeline listo para eventos en vivo: goles, tarjetas y cambios.</span>}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
