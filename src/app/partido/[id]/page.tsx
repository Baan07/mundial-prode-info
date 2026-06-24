import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CalendarClock, MapPin } from "lucide-react";
import { AutoRefresh } from "@/components/AutoRefresh";
import { PredictionCard } from "@/components/PredictionCard";
import { StatBadge } from "@/components/StatBadge";
import { formatArgentinaTime, getRealMatch, getTeamFromList } from "@/lib/realData";
import { predictMatch } from "@/lib/predictionEngine";

type Props = { params: Promise<{ id: string }> };

export const revalidate = 30;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const { match, teams } = await getRealMatch(id);
  if (!match) return { title: "Partido no encontrado" };
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  return {
    title: `${home?.name} vs ${away?.name} | Mundial Prode Info`,
    description: `${home?.name} vs ${away?.name}: horario Argentina, estadio, estado y previa para prode.`,
  };
}

export default async function MatchPage({ params }: Props) {
  const { id } = await params;
  const { match, teams } = await getRealMatch(id);
  if (!match) notFound();
  const home = getTeamFromList(teams, match.homeTeamId);
  const away = getTeamFromList(teams, match.awayTeamId);
  if (!home || !away) notFound();

  const prediction = predictMatch(home, away, match);
  const hasScore = match.homeScore !== undefined && match.awayScore !== undefined;

  return (
    <main className="mx-auto max-w-5xl px-4 py-6">
      <AutoRefresh seconds={30} />
      <section className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.055]">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <p className="text-xs font-black uppercase tracking-wide text-sky-300">
            #{match.matchNumber} · {match.group ? `Grupo ${match.group}` : match.phase}
          </p>
          <span className="rounded-md bg-white/10 px-3 py-1 text-sm font-black text-white">
            {match.status === "live" ? "En vivo" : match.status === "finished" ? "Final" : "Por jugar"}
          </span>
        </div>

        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-8">
          <div>
            <div className="text-6xl">{home.flag}</div>
            <h1 className="mt-3 text-2xl font-black text-white md:text-4xl">{home.name}</h1>
          </div>
          <div className="rounded-lg bg-slate-950 px-5 py-4 text-center">
            {hasScore ? (
              <div className="text-5xl font-black text-white">
                {match.homeScore}-{match.awayScore}
              </div>
            ) : (
              <div className="text-2xl font-black text-sky-200">VS</div>
            )}
          </div>
          <div className="text-right">
            <div className="text-6xl">{away.flag}</div>
            <h2 className="mt-3 text-2xl font-black text-white md:text-4xl">{away.name}</h2>
          </div>
        </div>

        <div className="grid gap-3 border-t border-white/10 px-4 py-4 text-sky-100/75 md:grid-cols-2">
          <span className="flex items-center gap-2">
            <CalendarClock size={18} /> {formatArgentinaTime(match.kickoffAt)} ARG
          </span>
          <span className="flex items-center gap-2 md:justify-end">
            <MapPin size={18} /> {match.stadium}, {match.city}
          </span>
        </div>
      </section>

      <section className="mt-5 grid gap-4 sm:grid-cols-3">
        <StatBadge label="Fuerza local" value={home.strengthRating} />
        <StatBadge label="Fuerza visita" value={away.strengthRating} />
        <StatBadge label="Riesgo prode" value={prediction.risk} />
      </section>

      <section className="mt-5">
        <PredictionCard prediction={prediction} />
      </section>
    </main>
  );
}
