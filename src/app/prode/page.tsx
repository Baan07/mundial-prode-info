import { ProdePredictionForm } from "@/components/ProdePredictionForm";
import { ProdeRanking } from "@/components/ProdeRanking";
import { prodeRules } from "@/lib/data";

export default function ProdePage() {
  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-4 sm:py-8">
      <section className="sports-panel broadcast-field mb-6 overflow-hidden rounded-2xl p-4 sm:p-6">
        <p className="text-xs font-black uppercase tracking-wide text-[#d8ff3f]">World Cup Broadcast Experience</p>
        <h1 className="mt-2 font-display text-5xl leading-none text-white sm:text-7xl">Prode</h1>
        <p className="mt-2 max-w-2xl text-sm font-bold text-stone-300/75">
          Predicciones recreativas con formato de previa deportiva.
        </p>
      </section>
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <h2 className="font-display text-4xl leading-none text-[#101312]">Crea un grupo privado e invita amigos</h2>
          <div className="broadcast-card mt-4 rounded-2xl p-4">
            <input className="broadcast-input w-full rounded-xl p-3" placeholder="Nombre del prode" />
            <button className="broadcast-button mt-3 w-full rounded-xl px-4 py-3 font-black uppercase">Crear prode y generar codigo</button>
            <p className="mt-3 rounded-xl bg-[#0c1110] p-3 text-center font-mono text-xl font-black text-[#d8ff3f]">ARG-2026</p>
          </div>
          <div className="broadcast-card mt-6 rounded-2xl p-4">
            <h2 className="text-lg font-black text-white">Reglas configurables</h2>
            <div className="mt-3 grid gap-2">
              {prodeRules.map(([label, points]) => <label className="flex items-center justify-between gap-3 rounded-xl bg-[#0c1110] p-3 text-stone-50" key={label}><span>{label}</span><input className="broadcast-input w-20 rounded-lg p-2 text-right" defaultValue={points} /></label>)}
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          <ProdePredictionForm />
          <ProdeRanking />
        </div>
      </section>
    </main>
  );
}
