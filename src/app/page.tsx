import Link from "next/link";
import { MessageCircle, PlusCircle } from "lucide-react";
import { GroupTable } from "@/components/GroupTable";
import { MatchCard } from "@/components/MatchCard";
import { ScorerTable } from "@/components/ScorerTable";
import { SearchBar } from "@/components/SearchBar";
import { matches } from "@/lib/data";

export default function Home() {
  const highlighted = matches.slice(0, 3);
  const prodeMatches = matches.filter((match) => match.importance >= 4).slice(0, 3);

  return (
    <main className="mx-auto max-w-7xl px-4 py-6 md:py-10">
      <section className="grid gap-6 md:grid-cols-[1.15fr_0.85fr] md:items-end">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-sky-300">Mundial 2026 · Argentina</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight text-white md:text-6xl">Fixture, datos y predicciones para ganar el prode de amigos.</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-sky-100/75">Una PWA rapida para consultar partidos, selecciones, jugadores, goleadores y consejos recreativos antes de completar tus pronosticos.</p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="inline-flex items-center justify-center gap-2 rounded-md bg-sky-400 px-5 py-3 font-black text-slate-950" href="/prode"><PlusCircle size={18} /> Crear o entrar a un prode</Link>
            <a className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-500 px-5 py-3 font-black text-slate-950" href="https://wa.me/?text=Mundial%20Prode%20Info%20para%20armar%20el%20prode%202026" target="_blank" rel="noreferrer"><MessageCircle size={18} /> Compartir</a>
          </div>
        </div>
        <SearchBar />
      </section>

      <section className="mt-10 grid gap-4 md:grid-cols-3">
        {highlighted.map((match) => <MatchCard match={match} key={match.id} />)}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="mb-4 text-2xl font-black text-white">Tabla rapida de grupos</h2>
          <GroupTable />
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-black text-white">Top goleadores</h2>
          <ScorerTable />
        </div>
      </section>

      <section className="mt-10">
        <h2 className="mb-4 text-2xl font-black text-white">Partidos ideales para el prode</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {prodeMatches.map((match) => <MatchCard match={match} key={match.id} />)}
        </div>
      </section>
    </main>
  );
}
