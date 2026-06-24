import { notFound } from "next/navigation";
import { StatBadge } from "@/components/StatBadge";
import { getPlayer, getTeam } from "@/lib/data";

type Props = { params: Promise<{ id: string }> };

export default async function PlayerPage({ params }: Props) {
  const { id } = await params;
  const player = getPlayer(id);
  if (!player) notFound();
  const team = getTeam(player.teamId);
  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <section className="rounded-lg border border-white/10 bg-white/[0.05] p-6">
        <p className="text-sky-200/70">{team?.flag} {team?.name} · {player.position}</p>
        <h1 className="mt-2 text-5xl font-black text-white">{player.name}</h1>
        <p className="mt-3 text-sky-100/70">{player.currentClub}, {player.clubCountry} · {player.age} anos · Camiseta #{player.shirtNumber ?? "-"}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <StatBadge label="Goles" value={player.goals} />
          <StatBadge label="Asistencias" value={player.assists} />
          <StatBadge label="Partidos" value={player.matches} />
          <StatBadge label="Minutos" value={player.minutes} />
          <StatBadge label="Amarillas" value={player.yellowCards} />
          <StatBadge label="Rojas" value={player.redCards} />
        </div>
        <p className="mt-6 text-sky-100/70">Historial basico preparado para cargar datos de clubes, torneos previos y rendimiento reciente desde el panel admin o una API externa.</p>
      </section>
    </main>
  );
}
