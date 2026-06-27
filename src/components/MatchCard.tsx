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
  scheduled: "border-white/10 bg-[#111816] hover:bg-[#17211e]",
  live: "border-l-4 border-[#d8ff3f] border-t-[#d8ff3f]/45 bg-[#18251b] shadow-[inset_0_0_0_1px_rgba(216,255,63,0.18)] hover:bg-[#1d2d20]",
  finished: "border-t-white/10 bg-[#161b1a] opacity-95 hover:bg-[#1d2422]",
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
  scheduled: "border-white/10 text-stone-200",
  live: "border-[#d8ff3f]/25 text-[#d8ff3f]",
  finished: "border-white/10 text-stone-200",
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
      <article className={`grid grid-cols-[66px_minmax(0,1fr)] border-t transition sm:grid-cols-[76px_minmax(0,1fr)] md:grid-cols-[96px_minmax(0,1fr)_220px] ${rowStyle[match.status]}`}>
        <div className={`grid place-items-center border-r px-1.5 py-3 text-center sm:px-2 ${timeBorderStyle[match.status]}`}>
          <span className="text-[11px] font-black text-white sm:text-xs">{timeOnly(match.kickoffAt)}</span>
          {match.status !== "scheduled" ? (
            <span className={`mt-1 rounded-full px-2 py-0.5 text-[10px] font-black ${badgeStyle[match.status]}`}>
              {match.status === "live" && match.liveMinute ? `${match.liveMinute}'` : statusLabel[match.status]}
            </span>
          ) : null}
        </div>

        <div className="min-w-0 px-3 py-3 sm:hidden">
          <div className="grid gap-2">
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_44px] items-center gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <FlagBadge size="sm" team={home} />
                <span className="min-w-0 truncate text-[14px] font-black leading-tight text-white">{home.name}</span>
              </div>
              <span className="rounded-md bg-[#f2efe4] px-2 py-1 text-center text-lg font-black leading-none text-[#101312]">
                {hasScore ? match.homeScore : "-"}
              </span>
            </div>
            <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_44px] items-center gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <FlagBadge size="sm" team={away} />
                <span className="min-w-0 truncate text-[14px] font-black leading-tight text-white">{away.name}</span>
              </div>
              <span className="rounded-md bg-[#f2efe4] px-2 py-1 text-center text-lg font-black leading-none text-[#101312]">
                {hasScore ? match.awayScore : "-"}
              </span>
            </div>
          </div>
          <div className="mt-2 truncate text-[11px] font-bold text-stone-300/75">
            {match.stadium}, {match.city}
          </div>
        </div>

        <div className="hidden min-w-0 grid-cols-[minmax(0,1fr)_42px_minmax(0,1fr)] items-center gap-2 px-3 py-3 sm:grid">
          <div className="flex min-w-0 items-center justify-end gap-2 text-right">
            <span className="min-w-0 truncate text-[13px] font-black leading-tight text-white sm:text-sm md:text-base">{home.name}</span>
            <FlagBadge size="sm" team={home} />
          </div>
          <div className="rounded-md bg-[#f2efe4] px-1 py-1 text-center text-base font-black text-[#101312] ring-1 ring-white/10 sm:text-lg">
            {hasScore ? `${match.homeScore}-${match.awayScore}` : "-"}
          </div>
          <div className="flex min-w-0 items-center gap-2">
            <FlagBadge size="sm" team={away} />
            <span className="min-w-0 truncate text-[13px] font-black leading-tight text-white sm:text-sm md:text-base">{away.name}</span>
          </div>
          <div className="col-span-3 mt-1 truncate text-center text-[11px] font-bold text-stone-300/75 sm:text-xs">
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
