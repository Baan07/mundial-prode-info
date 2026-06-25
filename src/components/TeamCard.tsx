import Link from "next/link";
import { FlagBadge } from "@/components/FlagBadge";
import { Team } from "@/lib/types";
import { StatBadge } from "./StatBadge";

export function TeamCard({ team }: { team: Team }) {
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <FlagBadge size="lg" team={team} />
          <h3 className="mt-2 text-xl font-bold text-white">{team.name}</h3>
          <p className="text-sm text-sky-100/65">Grupo {team.group} · DT {team.coach}</p>
        </div>
        <div className="rounded-md bg-sky-400 px-3 py-2 text-center text-slate-950">
          <div className="text-xs font-bold uppercase">Fuerza</div>
          <div className="text-2xl font-black">{team.strengthRating}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <StatBadge label="Pts" value={team.points} />
        <StatBadge label="GF" value={team.goalsFor} />
        <StatBadge label="DG" value={team.goalsFor - team.goalsAgainst} />
      </div>
      <Link className="mt-4 inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-bold text-slate-950" href={`/equipo/${team.id}`}>
        Ver plantel
      </Link>
    </article>
  );
}
