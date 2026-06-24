import { ProdeRanking } from "@/components/ProdeRanking";
import { StatBadge } from "@/components/StatBadge";

export default function MyProdePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="text-4xl font-black text-white">Mi prode</h1>
      <section className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatBadge label="Mis puntos" value={21} />
        <StatBadge label="Ranking" value="#2" />
        <StatBadge label="Exactos" value={3} />
        <StatBadge label="% acierto" value="62%" />
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
          <h2 className="text-xl font-bold text-white">Predicciones pendientes</h2>
          <div className="mt-3 grid gap-2 text-sky-100/75"><p>Argentina vs Brasil</p><p>Francia vs España</p><p>Portugal vs Alemania</p></div>
        </div>
        <ProdeRanking />
      </section>
    </main>
  );
}
