import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PredictionCard } from "@/components/PredictionCard";
import { StatBadge } from "@/components/StatBadge";
import { formatArgentinaTime, getMatch, getTeam, teamPlayers } from "@/lib/data";
import { predictMatch } from "@/lib/predictionEngine";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const match = getMatch(id);
  if (!match) return { title: "Partido no encontrado" };
  const home = getTeam(match.homeTeamId);
  const away = getTeam(match.awayTeamId);
  return {
    title: `${home?.name} vs ${away?.name} | Mundial Prode Info`,
    description: `Previa, probabilidades y consejos para el prode de ${home?.name} vs ${away?.name}.`,
    openGraph: {
      title: `${home?.name} vs ${away?.name}`,
      description: `Datos del partido, jugadores clave y marcador estimado.`,
    },
  };
}

export default async function MatchPage({ params }: Props) {
  const { id } = await params;
  const match = getMatch(id);
  if (!match) notFound();
  const home = getTeam(match.homeTeamId);
  const away = getTeam(match.awayTeamId);
  if (!home || !away) notFound();
  const prediction = predictMatch(home, away, match);
  const homePlayers = teamPlayers(home.id).filter((player) => player.position === "Delantero").slice(0, 2);
  const awayPlayers = teamPlayers(away.id).filter((player) => player.position === "Delantero").slice(0, 2);

  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <section className="rounded-lg border border-white/10 bg-white/[0.05] p-5 md:p-8">
        <p className="text-sm font-bold uppercase tracking-wide text-sky-300">{match.phase} · Grupo {match.group}</p>
        <h1 className="mt-3 text-4xl font-black text-white md:text-6xl">{home.flag} {home.name} vs {away.flag} {away.name}</h1>
        <p className="mt-4 text-lg text-sky-100/75">{formatArgentinaTime(match.kickoffAt)} · {match.stadium}, {match.city}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          <StatBadge label="Fuerza local" value={home.strengthRating} />
          <StatBadge label="Fuerza visita" value={away.strengthRating} />
          <StatBadge label="Confianza" value={prediction.confidence} />
          <StatBadge label="Riesgo prode" value={prediction.risk} />
        </div>
      </section>
      <section className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <PredictionCard prediction={prediction} />
        <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5">
          <h2 className="text-2xl font-black text-white">Consejos para prode</h2>
          <ul className="mt-4 grid gap-3 text-sky-100/75">
            <li>Resultado mas probable: {prediction.predictedHomeScore}-{prediction.predictedAwayScore}</li>
            <li>{prediction.confidence === "alto" ? "Conviene resultado simple antes que buscar cuota emocional." : "Partido parejo: mejor cubrir empate o diferencia corta."}</li>
            <li>Posible goleador: {[...homePlayers, ...awayPlayers][0]?.name ?? "delantero titular"}</li>
            <li>Ultimos resultados {home.name}: {home.recentForm.join(" ")}</li>
            <li>Ultimos resultados {away.name}: {away.recentForm.join(" ")}</li>
          </ul>
        </div>
      </section>
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {[home, away].map((team) => (
          <div className="rounded-lg border border-white/10 bg-white/[0.05] p-5" key={team.id}>
            <h2 className="text-xl font-black text-white">Jugadores clave de {team.name}</h2>
            <div className="mt-4 grid gap-2">
              {teamPlayers(team.id).slice(0, 4).map((player) => <div className="rounded-md bg-slate-950/70 p-3 text-sky-50" key={player.id}>{player.name} · {player.position} · {player.currentClub}</div>)}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
