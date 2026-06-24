import { ProdePredictionForm } from "@/components/ProdePredictionForm";
import { ProdeRanking } from "@/components/ProdeRanking";
import { prodeRules } from "@/lib/data";

export default function ProdePage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-300">Prode recreativo</p>
          <h1 className="mt-2 text-4xl font-black text-white">Crea un grupo privado e invita amigos</h1>
          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.05] p-4">
            <input className="w-full rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50" placeholder="Nombre del prode" />
            <button className="mt-3 w-full rounded-md bg-sky-400 px-4 py-3 font-black text-slate-950">Crear prode y generar codigo</button>
            <p className="mt-3 rounded-md bg-slate-950 p-3 text-center font-mono text-xl text-sky-200">ARG-2026</p>
          </div>
          <div className="mt-6 rounded-lg border border-white/10 bg-white/[0.05] p-4">
            <h2 className="text-lg font-bold text-white">Reglas configurables</h2>
            <div className="mt-3 grid gap-2">
              {prodeRules.map(([label, points]) => <label className="flex items-center justify-between gap-3 rounded-md bg-slate-950/70 p-3 text-sky-50" key={label}><span>{label}</span><input className="w-20 rounded-md bg-slate-900 p-2 text-right" defaultValue={points} /></label>)}
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
