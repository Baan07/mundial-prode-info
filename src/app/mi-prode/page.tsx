import { ProdeRanking } from "@/components/ProdeRanking";
import { StatBadge } from "@/components/StatBadge";

export default function MyProdePage() {
  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8">
      <section className="sports-panel broadcast-field rounded-2xl p-4 sm:p-6">
        <p className="text-xs font-black uppercase tracking-wide text-[#d8ff3f]">Panel del participante</p>
        <h1 className="font-display text-5xl leading-none text-white sm:text-7xl">Mi prode</h1>
      </section>
      <section className="mt-6 grid gap-4 sm:grid-cols-4">
        <StatBadge label="Mis puntos" value={21} />
        <StatBadge label="Ranking" value="#2" />
        <StatBadge label="Exactos" value={3} />
        <StatBadge label="% acierto" value="62%" />
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="broadcast-card rounded-2xl p-4">
          <h2 className="text-xl font-black text-white">Predicciones pendientes</h2>
          <div className="mt-3 grid gap-2 text-stone-300/75"><p>Argentina vs Brasil</p><p>Francia vs España</p><p>Portugal vs Alemania</p></div>
        </div>
        <ProdeRanking />
      </section>
    </main>
  );
}
