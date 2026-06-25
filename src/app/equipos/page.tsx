import Link from "next/link";
import { FlagBadge } from "@/components/FlagBadge";
import { getWorldCupData } from "@/lib/realData";

export const revalidate = 1800;

export default async function TeamsPage() {
  const { teams } = await getWorldCupData();
  const orderedTeams = teams
    .filter((team) => team.group)
    .sort((a, b) => a.group.localeCompare(b.group) || a.name.localeCompare(b.name));

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <h1 className="text-4xl font-black text-white">Equipos</h1>
      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderedTeams.map((team) => (
          <Link className="rounded-lg border border-white/10 bg-white/[0.055] p-4 transition hover:border-sky-300/50" href={`/equipo/${team.id}`} key={team.id}>
            <FlagBadge size="lg" team={team} />
            <h2 className="mt-3 text-xl font-black text-white">{team.name}</h2>
            <p className="mt-1 text-sm font-bold text-sky-200">Grupo {team.group}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
