import Link from "next/link";
import { FlagBadge } from "@/components/FlagBadge";
import { Team } from "@/lib/types";
import { StatBadge } from "./StatBadge";

export function TeamCard({ team }: { team: Team }) {
  return (
    <article className="broadcast-card overflow-hidden rounded-2xl">
      <div className="h-1 bg-[#d8ff3f]" />
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <FlagBadge size="lg" team={team} />
            <h3 className="mt-2 truncate text-xl font-black text-white">{team.name}</h3>
            <p className="text-sm text-stone-300/70">Grupo {team.group} - DT {team.coach}</p>
          </div>
          <div className="shrink-0 rounded-xl bg-[#f2efe4] px-3 py-2 text-center text-[#101312]">
            <div className="text-xs font-black uppercase">Fuerza</div>
            <div className="text-2xl font-black">{team.strengthRating}</div>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2">
          <StatBadge label="Pts" value={team.points} />
          <StatBadge label="GF" value={team.goalsFor} />
          <StatBadge label="DG" value={team.goalsFor - team.goalsAgainst} />
        </div>
        <Link className="broadcast-button mt-4 inline-flex w-full justify-center rounded-xl px-4 py-2 text-sm font-black uppercase" href={`/equipo/${team.id}`}>
          Ver plantel
        </Link>
      </div>
    </article>
  );
}
