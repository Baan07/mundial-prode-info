import Link from "next/link";
import { Tv } from "lucide-react";
import { FlagBadge } from "@/components/FlagBadge";
import { channelLabel } from "@/lib/broadcast";
import { formatArgentinaTime, getTeamFromList } from "@/lib/matchUtils";
import { Match, Team } from "@/lib/types";

const statusLabel = {
  live: "EN VIVO",
  finished: "FINAL",
};

const rowStyle = {
  scheduled: "border-white/10 bg-[#061f16]/88 hover:bg-[#0b3021]",
  live: "border-l-4 border-lime-300 border-t-lime-300/45 bg-[#174d27]/95 shadow-[inset_0_0_0_1px_rgba(183,255,33,0.24)] hover:bg-[#1b5a2e]",
  finished: "border-t-cyan-100/15 bg-[#102b35]/92 opacity-95 hover:bg-[#163846]",
};

const badgeStyle = {
  live: "bg-lime-400 text-green-950",
  finished: "bg-slate-200 text-slate-900",
};

const timeBorderStyle = {
  scheduled: "border-emerald-100/20",
  live: "border-lime-300/35",
  finished: "border-slate-200/20",
};

const tvStyle = {
  scheduled: "border-emerald-100/10 text-lime-200",
  live: "border-lime-300/25 text-lime-100",
  finished: "border-slate-200/15 text-slate-200",
};

function timeOnly(value: string) {
  return formatArgentinaTime(value).split(",").pop()?.trim() ?? formatArgentinaTime(value);
}

export function MatchCard({ match, teams }: { match: Match; teams: Team[]; compact?: boolean }) {
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  if (!home || !away) return null;

  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <Link className="block" href={`/partido/${match.id}`}>
      <article className={`grid grid-cols-[62px_minmax(0,1fr)] border-t transition sm:grid-cols-[76px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)_220px] ${rowStyle[match.status]}`}>
        <div className={`grid place-items-center border-r px-1.5 py-3 text-center sm:px-2 ${timeBorderStyle[match.status]}`}>
          <span className="text-[11px] font-black text-white sm:text-xs">{timeOnly(match.kickoffAt)}</span>
          {match.status !== "scheduled" ? (
            <span className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-black ${badgeStyle[match.status]}`}>
              {match.status === "live" && match.liveMinute ? `${match.liveMinute}'` : statusLabel[match.status]}
            </span>
          ) : null}
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_34px_minmax(0,1fr)] items-center gap-1.5 px-2 py-3 sm:grid-cols-[minmax(0,1fr)_42px_minmax(0,1fr)] sm:gap-2 sm:px-3">
          <div className="flex min-w-0 items-center justify-end gap-2 text-right">
            <span className="min-w-0 truncate text-[13px] font-black leading-tight text-white sm:text-sm md:text-base">{home.name}</span>
            <FlagBadge size="sm" team={home} />
          </div>
          <div className="rounded-md bg-black/30 px-1 py-1 text-center text-base font-black text-white ring-1 ring-white/10 sm:text-lg">
            {hasScore ? `${match.homeScore}-${match.awayScore}` : "-"}
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <FlagBadge size="sm" team={away} />
            <span className="min-w-0 truncate text-[13px] font-black leading-tight text-white sm:text-sm md:text-base">{away.name}</span>
          </div>
          <div className="col-span-3 mt-1 truncate text-center text-[11px] font-bold text-emerald-100/70 sm:text-xs">
            {match.stadium}, {match.city}
          </div>
        </div>

        <div className={`col-span-2 flex min-w-0 items-center gap-2 border-t px-2.5 py-2 text-[11px] font-bold sm:px-3 sm:text-xs md:col-span-1 md:border-l md:border-t-0 ${tvStyle[match.status]}`}>
          <Tv className="shrink-0" size={15} />
          <span className="truncate">{channelLabel(match)}</span>
        </div>
      </article>
    </Link>
  );
}
