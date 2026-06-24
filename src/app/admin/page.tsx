import { AdminMatchEditor } from "@/components/AdminMatchEditor";

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <p className="text-sm font-bold uppercase tracking-wide text-sky-300">Supabase Auth requerido en produccion</p>
      <h1 className="mt-2 text-4xl font-black text-white">Admin basico</h1>
      <section className="mt-6 grid gap-4 lg:grid-cols-[1fr_0.8fr]">
        <AdminMatchEditor />
        <div className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
          <h2 className="text-lg font-bold text-white">Cargas rapidas</h2>
          <div className="mt-4 grid gap-3">
            {["Seleccion", "Jugador", "Gol", "Tarjeta", "Noticia breve"].map((item) => <button className="rounded-md border border-white/10 bg-slate-950 p-3 text-left font-bold text-sky-50" key={item}>Cargar {item}</button>)}
            <button className="rounded-md bg-sky-400 p-3 font-black text-slate-950">Recalcular tablas y puntos</button>
          </div>
        </div>
      </section>
    </main>
  );
}
