import { notFound } from "next/navigation";
import { FlagBadge } from "@/components/FlagBadge";
import { LineupPanel } from "@/components/LineupPanel";
import { MatchCard } from "@/components/MatchCard";
import { getLineup, getTeamFromList, getWorldCupData } from "@/lib/realData";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 1800;

export default async function TeamPage({ params }: Props) {
  const { id } = await params;
  const { teams, matches } = await getWorldCupData();
  const team = getTeamFromList(teams, id);
  if (!team) notFound();
  const lineup = await getLineup(team.id);
  const teamMatches = matches.filter((match) => match.homeTeamId === team.id || match.awayTeamId === team.id);

  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8">
      <section className="sports-panel broadcast-field overflow-hidden rounded-2xl p-4 sm:p-6">
        <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-end">
          <div className="min-w-0">
            <FlagBadge size="xl" team={team} />
            <h1 className="mt-3 font-display text-6xl leading-none text-white sm:text-7xl">{team.name}</h1>
            <p className="mt-2 text-sm font-black uppercase tracking-wide text-[#d8ff3f]">Grupo {team.group || "-"}</p>
          </div>
          <div className="grid grid-cols-3 gap-2 md:w-80">
            <div className="rounded-xl bg-[#f2efe4] p-3 text-center text-[#101312]">
              <p className="text-[10px] font-black uppercase">Pts</p>
              <p className="text-2xl font-black">{team.points}</p>
            </div>
            <div className="rounded-xl bg-[#f2efe4] p-3 text-center text-[#101312]">
              <p className="text-[10px] font-black uppercase">GF</p>
              <p className="text-2xl font-black">{team.goalsFor}</p>
            </div>
            <div className="rounded-xl bg-[#d8ff3f] p-3 text-center text-[#101312]">
              <p className="text-[10px] font-black uppercase">DG</p>
              <p className="text-2xl font-black">{team.goalsFor - team.goalsAgainst}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <LineupPanel lineup={lineup} team={team} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 font-display text-4xl leading-none text-[#101312]">Partidos</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teamMatches.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
