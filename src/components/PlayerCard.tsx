import Link from "next/link";
import { getTeam } from "@/lib/data";
import { Player } from "@/lib/types";

export function PlayerCard({ player }: { player: Player }) {
  const team = getTeam(player.teamId);
  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.05] p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-sky-200/70">{team?.flag} {team?.name} · {player.position}</p>
          <h3 className="mt-1 text-lg font-bold text-white">{player.name}</h3>
          <p className="text-sm text-sky-100/60">{player.currentClub}, {player.clubCountry}</p>
        </div>
        <span className="rounded-md bg-slate-950 px-3 py-2 text-lg font-black text-sky-200">#{player.shirtNumber ?? "-"}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-md bg-white/[0.06] p-2"><strong className="block text-white">{player.goals}</strong><span className="text-sky-100/60">Goles</span></div>
        <div className="rounded-md bg-white/[0.06] p-2"><strong className="block text-white">{player.assists}</strong><span className="text-sky-100/60">Asist.</span></div>
        <div className="rounded-md bg-white/[0.06] p-2"><strong className="block text-white">{player.age}</strong><span className="text-sky-100/60">Edad</span></div>
      </div>
      <Link className="mt-4 inline-flex text-sm font-bold text-sky-300" href={`/jugador/${player.id}`}>Ver ficha</Link>
    </article>
  );
}
