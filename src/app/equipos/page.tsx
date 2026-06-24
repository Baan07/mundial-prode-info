import { TeamCard } from "@/components/TeamCard";
import { teams } from "@/lib/data";

export default function TeamsPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-4xl font-black text-white">Selecciones</h1>
      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {teams.map((team) => <TeamCard team={team} key={team.id} />)}
      </section>
    </main>
  );
}
