import { FlagBadge } from "@/components/FlagBadge";
import { Team } from "@/lib/types";

function goalDifference(team: Team) {
  return team.goalsFor - team.goalsAgainst;
}

function sortedTeams(teams: Team[]) {
  return [...teams].sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (goalDifference(b) !== goalDifference(a)) return goalDifference(b) - goalDifference(a);
    if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
    return a.name.localeCompare(b.name, "es");
  });
}

export function StandingsTable({ group, teams }: { group: string; teams: Team[] }) {
  return (
    <article className="overflow-hidden rounded-lg border border-emerald-100/15 bg-[#052617]">
      <div className="border-b border-emerald-100/15 px-3 py-2">
        <h2 className="text-sm font-black uppercase text-white">Grupo {group}</h2>
      </div>
      <div className="grid grid-cols-[minmax(0,1fr)_30px_34px_30px_30px_34px] items-center gap-1 border-b border-emerald-100/10 px-2 py-2 text-[10px] font-black uppercase text-emerald-100/55 sm:grid-cols-[minmax(0,1fr)_34px_42px_34px_34px_42px]">
        <span>Equipo</span>
        <span className="text-center">PJ</span>
        <span className="text-center">Pts</span>
        <span className="text-center">GF</span>
        <span className="text-center">GC</span>
        <span className="text-center">DG</span>
      </div>
      {sortedTeams(teams).map((team, index) => (
        <div
          className="grid grid-cols-[minmax(0,1fr)_30px_34px_30px_30px_34px] items-center gap-1 border-b border-emerald-100/10 px-2 py-2 text-xs font-bold text-white last:border-b-0 sm:grid-cols-[minmax(0,1fr)_34px_42px_34px_34px_42px]"
          key={team.id}
        >
          <div className="flex min-w-0 items-center gap-2">
            <span className={`grid size-5 shrink-0 place-items-center rounded text-[10px] font-black ${index < 2 ? "bg-lime-400 text-green-950" : "bg-white/10 text-emerald-100"}`}>
              {index + 1}
            </span>
            <FlagBadge size="xs" team={team} />
            <span className="min-w-0 truncate">{team.name}</span>
          </div>
          <span className="text-center text-emerald-100/75">{team.played}</span>
          <span className="text-center font-black text-lime-300">{team.points}</span>
          <span className="text-center text-emerald-100/75">{team.goalsFor}</span>
          <span className="text-center text-emerald-100/75">{team.goalsAgainst}</span>
          <span className="text-center text-emerald-100/75">{goalDifference(team)}</span>
        </div>
      ))}
    </article>
  );
}
