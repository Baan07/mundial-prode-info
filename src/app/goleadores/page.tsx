import { ScorerTable } from "@/components/ScorerTable";
import { historicalScorers } from "@/lib/data";

export default function ScorersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-4xl font-black text-white">Goleadores</h1>
      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Todas las selecciones</option></select>
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Todos los grupos</option></select>
      </div>
      <section className="mt-6">
        <ScorerTable />
      </section>
      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-black text-white">Goleadores historicos de los Mundiales</h2>
        <div className="overflow-hidden rounded-lg border border-white/10">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/[0.07] text-xs uppercase text-sky-100/65"><tr><th className="p-3">#</th><th>Nombre</th><th>Pais</th><th>Goles</th><th>Anios</th></tr></thead>
            <tbody className="divide-y divide-white/10">
              {historicalScorers.map((scorer, index) => (
                <tr className="text-sky-50" key={scorer.id}><td className="p-3">{index + 1}</td><td className="font-semibold">{scorer.playerName}</td><td>{scorer.country}</td><td>{scorer.totalGoals}</td><td>{scorer.yearsPlayed}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
