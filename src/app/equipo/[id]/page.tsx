import { notFound } from "next/navigation";
import { MatchCard } from "@/components/MatchCard";
import { PlayerCard } from "@/components/PlayerCard";
import { StatBadge } from "@/components/StatBadge";
import { getTeam, teamMatches, teamPlayers } from "@/lib/data";
import { Position } from "@/lib/types";

type Props = { params: Promise<{ id: string }> };
const positions: Position[] = ["Arquero", "Defensor", "Mediocampista", "Delantero"];

export default async function TeamPage({ params }: Props) {
  const { id } = await params;
  const team = getTeam(id);
  if (!team) notFound();
  const roster = teamPlayers(team.id);
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
        <div className="text-5xl">{team.flag}</div>
        <h1 className="mt-3 text-5xl font-black text-white">{team.name}</h1>
        <p className="mt-2 text-sky-100/70">Grupo {team.group} · DT {team.coach}</p>
        <div className="mt-5 grid gap-3 sm:grid-cols-5">
          <StatBadge label="Fuerza" value={team.strengthRating} />
          <StatBadge label="PJ" value={team.played} />
          <StatBadge label="Pts" value={team.points} />
          <StatBadge label="GF" value={team.goalsFor} />
          <StatBadge label="GC" value={team.goalsAgainst} />
        </div>
      </section>
      <section className="mt-8">
        <h2 className="text-2xl font-black text-white">Plantel</h2>
        {positions.map((position) => (
          <div className="mt-5" key={position}>
            <h3 className="mb-3 text-lg font-bold text-sky-200">{position}s</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {roster.filter((player) => player.position === position).map((player) => <PlayerCard player={player} key={player.id} />)}
            </div>
          </div>
        ))}
      </section>
      <section className="mt-8">
        <h2 className="mb-4 text-2xl font-black text-white">Proximos partidos</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {teamMatches(team.id).map((match) => <MatchCard match={match} key={match.id} />)}
        </div>
      </section>
    </main>
  );
}
