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
  scheduled: "border-emerald-100/20 bg-[#062f1d]/92 hover:bg-[#0a3a24]",
  live: "border-l-4 border-lime-400 border-t-lime-300/45 bg-[#12451f]/95 shadow-[inset_0_0_0_1px_rgba(163,230,53,0.22)] hover:bg-[#175526]",
  finished: "border-t-slate-300/18 bg-[#183044]/92 opacity-90 hover:bg-[#203a51]",
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
      <article className={`grid grid-cols-[58px_minmax(0,1fr)] border-t transition sm:grid-cols-[72px_minmax(0,1fr)] md:grid-cols-[92px_minmax(0,1fr)_210px] ${rowStyle[match.status]}`}>
        <div className={`grid place-items-center border-r px-1.5 py-3 text-center sm:px-2 ${timeBorderStyle[match.status]}`}>
          <span className="text-[11px] font-black text-white sm:text-xs">{timeOnly(match.kickoffAt)}</span>
          {match.status !== "scheduled" ? (
            <span className={`mt-1 rounded px-1.5 py-0.5 text-[10px] font-black ${badgeStyle[match.status]}`}>
              {match.status === "live" && match.liveMinute ? `${match.liveMinute}'` : statusLabel[match.status]}
            </span>
          ) : null}
        </div>

        <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_34px_minmax(0,1fr)] items-center gap-1.5 px-2 py-3 sm:grid-cols-[minmax(0,1fr)_42px_minmax(0,1fr)] sm:gap-2 sm:px-3">
          <div className="flex min-w-0 items-center justify-end gap-2 text-right">
            <span className="min-w-0 truncate text-[13px] font-black leading-tight text-white sm:text-sm md:text-base">{home.name}</span>
            <FlagBadge size="sm" team={home} />
          </div>
          <div className="text-center text-base font-black text-white sm:text-lg">
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
