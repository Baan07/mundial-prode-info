import Link from "next/link";
import { getTeam } from "@/lib/data";
import { Player } from "@/lib/types";

export function PlayerCard({ player }: { player: Player }) {
  const team = getTeam(player.teamId);
  return (
    <article className="broadcast-card rounded-2xl p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-sm text-stone-300/70">{team?.flag} {team?.name} - {player.position}</p>
          <h3 className="mt-1 truncate text-lg font-black text-white">{player.name}</h3>
          <p className="truncate text-sm text-stone-300/60">{player.currentClub}, {player.clubCountry}</p>
        </div>
        <span className="shrink-0 rounded-xl bg-[#f2efe4] px-3 py-2 text-lg font-black text-[#101312]">#{player.shirtNumber ?? "-"}</span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-xl bg-[#0c1110] p-2"><strong className="block text-white">{player.goals}</strong><span className="text-stone-300/60">Goles</span></div>
        <div className="rounded-xl bg-[#0c1110] p-2"><strong className="block text-white">{player.assists}</strong><span className="text-stone-300/60">Asist.</span></div>
        <div className="rounded-xl bg-[#0c1110] p-2"><strong className="block text-white">{player.age}</strong><span className="text-stone-300/60">Edad</span></div>
      </div>
      <Link className="mt-4 inline-flex text-sm font-black uppercase text-[#d8ff3f]" href={`/jugador/${player.id}`}>Ver ficha</Link>
    </article>
  );
}
