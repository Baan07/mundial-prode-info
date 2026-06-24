import Link from "next/link";
import { CalendarClock, ChartNoAxesCombined, MessageCircle } from "lucide-react";
import { formatArgentinaTime, getTeam } from "@/lib/data";
import { predictMatch } from "@/lib/predictionEngine";
import { Match } from "@/lib/types";

export function MatchCard({ match }: { match: Match }) {
  const home = getTeam(match.homeTeamId);
  const away = getTeam(match.awayTeamId);
  if (!home || !away) return null;
  const prediction = predictMatch(home, away, match);
  const shareText = encodeURIComponent(`Previa ${home.name} vs ${away.name}: ${prediction.predictedHomeScore}-${prediction.predictedAwayScore}. Mundial Prode Info`);

  return (
    <article className="rounded-lg border border-white/10 bg-white/[0.05] p-4 shadow-xl shadow-black/20">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wide text-sky-200/70">{match.phase} · Grupo {match.group}</p>
          <h3 className="mt-2 text-xl font-bold text-white">
            {home.flag} {home.name} <span className="text-sky-200/50">vs</span> {away.flag} {away.name}
          </h3>
        </div>
        <span className="rounded-md bg-sky-400 px-2 py-1 text-xs font-bold text-slate-950">{match.status}</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm text-sky-100/75">
        <span className="flex items-center gap-2"><CalendarClock size={16} /> {formatArgentinaTime(match.kickoffAt)}</span>
        <span>{match.stadium}, {match.city}</span>
      </div>
      <div className="mt-4 rounded-md bg-slate-950/70 p-3 text-sm text-sky-50">
        <ChartNoAxesCombined size={16} className="mb-2 text-sky-300" />
        Estimado: <strong>{prediction.predictedHomeScore}-{prediction.predictedAwayScore}</strong> · Confianza {prediction.confidence} · Riesgo {prediction.risk}
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <Link className="rounded-md bg-white px-4 py-2 text-sm font-bold text-slate-950" href={`/partido/${match.id}`}>Ver previa</Link>
        <Link className="rounded-md border border-sky-300/40 px-4 py-2 text-sm font-bold text-sky-50" href="/prode">Hacer prediccion</Link>
        <a className="inline-flex items-center gap-2 rounded-md bg-emerald-500 px-4 py-2 text-sm font-bold text-slate-950" href={`https://wa.me/?text=${shareText}`} target="_blank" rel="noreferrer">
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </article>
  );
}
