import { MatchCard } from "@/components/MatchCard";
import { matches, teams } from "@/lib/data";

export default function FixturePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-300">Fixture y resultados</p>
          <h1 className="mt-2 text-4xl font-black text-white">Partidos por fecha</h1>
        </div>
        <div className="grid gap-2 sm:grid-cols-3">
          <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Todos los grupos</option>{[...new Set(teams.map((team) => team.group))].map((group) => <option key={group}>Grupo {group}</option>)}</select>
          <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Todas las selecciones</option>{teams.map((team) => <option key={team.id}>{team.name}</option>)}</select>
          <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Todos los estados</option><option>Programado</option><option>En vivo</option><option>Finalizado</option></select>
        </div>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {matches.map((match) => <MatchCard match={match} key={match.id} />)}
      </section>
    </main>
  );
}
