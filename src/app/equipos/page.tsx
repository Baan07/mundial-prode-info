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
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8">
      <section className="sports-panel overflow-hidden rounded-2xl">
        <div className="scoreboard-topline px-4 py-3 text-xs font-black uppercase tracking-wide">
          World Cup Broadcast Experience
        </div>
        <div className="broadcast-field px-4 py-6 sm:px-6">
          <p className="text-xs font-black uppercase tracking-wide text-[#d8ff3f]">Mapa de selecciones</p>
          <h1 className="font-display text-5xl leading-none text-white sm:text-6xl">Equipos</h1>
          <p className="mt-2 max-w-2xl text-sm font-bold text-stone-300/75">
            Planteles, grupos, fuerza estimada y partidos de cada seleccion.
          </p>
        </div>
      </section>

      <section className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {orderedTeams.map((team) => (
          <Link className="broadcast-card group overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:border-[#d8ff3f]/60" href={`/equipo/${team.id}`} key={team.id}>
            <div className="h-1 bg-[#d8ff3f] opacity-60 transition group-hover:opacity-100" />
            <div className="p-4">
            <FlagBadge size="lg" team={team} />
            <h2 className="mt-3 truncate text-xl font-black text-white">{team.name}</h2>
            <p className="mt-1 text-sm font-black uppercase text-[#d8ff3f]">Grupo {team.group}</p>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
