import { PlayerCard } from "@/components/PlayerCard";
import { SearchBar } from "@/components/SearchBar";
import { players, teams } from "@/lib/data";

export default function PlayersPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-[1fr_1fr] md:items-end">
        <div>
          <h1 className="text-4xl font-black text-white">Jugadores</h1>
          <p className="mt-2 text-sky-100/70">Buscador y filtros preparados para conectar con Supabase.</p>
        </div>
        <SearchBar placeholder="Buscar por nombre, club o posicion" />
      </div>
      <div className="mt-5 grid gap-2 sm:grid-cols-4">
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Seleccion</option>{teams.map((team) => <option key={team.id}>{team.name}</option>)}</select>
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Club</option>{[...new Set(players.map((player) => player.currentClub))].map((club) => <option key={club}>{club}</option>)}</select>
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Posicion</option><option>Arquero</option><option>Defensor</option><option>Mediocampista</option><option>Delantero</option></select>
        <select className="rounded-md border border-white/10 bg-slate-950 p-3 text-sky-50"><option>Todos</option><option>Goleadores</option></select>
      </div>
      <section className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {players.map((player) => <PlayerCard player={player} key={player.id} />)}
      </section>
    </main>
  );
}
