import Link from "next/link";
import { CalendarClock, MapPin } from "lucide-react";
import { formatArgentinaTime, getTeamFromList } from "@/lib/realData";
import { Match, Team } from "@/lib/types";

const statusLabel = {
  scheduled: "Por jugar",
  live: "En vivo",
  finished: "Final",
};

export function MatchCard({
  match,
  teams,
  compact = false,
}: {
  match: Match;
  teams: Team[];
  compact?: boolean;
}) {
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  if (!home || !away) return null;

  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <Link className="block" href={`/partido/${match.id}`}>
      <article className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055] shadow-xl shadow-black/20 transition hover:border-sky-300/50">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
          <p className="text-xs font-bold uppercase tracking-wide text-sky-200/75">
            #{match.matchNumber ?? "--"} · {match.group ? `Grupo ${match.group}` : match.phase}
          </p>
          <span
            className={`rounded-md px-2 py-1 text-xs font-black ${
              match.status === "live" ? "bg-emerald-400 text-slate-950" : "bg-white/10 text-sky-50"
            }`}
          >
            {match.status === "live" && match.liveMinute ? `${match.liveMinute}' ` : ""}
            {statusLabel[match.status]}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-5">
          <div className="min-w-0">
            <div className="text-4xl leading-none">{home.flag}</div>
            <h3 className="mt-2 truncate text-lg font-black text-white">{home.name}</h3>
          </div>
          <div className="min-w-[76px] rounded-md bg-slate-950 px-3 py-2 text-center">
            {hasScore ? (
              <div className="text-3xl font-black text-white">
                {match.homeScore}-{match.awayScore}
              </div>
            ) : (
              <div className="text-sm font-black text-sky-200">VS</div>
            )}
          </div>
          <div className="min-w-0 text-right">
            <div className="text-4xl leading-none">{away.flag}</div>
            <h3 className="mt-2 truncate text-lg font-black text-white">{away.name}</h3>
          </div>
        </div>

        {!compact && (
          <div className="grid gap-2 px-4 pb-4 text-sm text-sky-100/75">
            <span className="flex items-center gap-2">
              <CalendarClock size={16} /> {formatArgentinaTime(match.kickoffAt)} ARG
            </span>
            <span className="flex items-center gap-2">
              <MapPin size={16} /> {match.stadium}, {match.city}
            </span>
          </div>
        )}
      </article>
    </Link>
  );
}
