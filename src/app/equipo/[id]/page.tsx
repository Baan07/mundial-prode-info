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
    <main className="mx-auto max-w-7xl px-4 py-6">
      <section className="rounded-lg border border-white/10 bg-white/[0.055] p-5">
        <FlagBadge size="xl" team={team} />
        <h1 className="mt-3 text-5xl font-black text-white">{team.name}</h1>
        <p className="mt-2 text-lg font-bold text-sky-200">Grupo {team.group || "-"}</p>
      </section>

      <section className="mt-5">
        <LineupPanel lineup={lineup} team={team} />
      </section>

      <section className="mt-6">
        <h2 className="mb-3 text-xl font-black text-white">Partidos</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {teamMatches.map((match) => (
            <MatchCard match={match} teams={teams} key={match.id} />
          ))}
        </div>
      </section>
    </main>
  );
}
