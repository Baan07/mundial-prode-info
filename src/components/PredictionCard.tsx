import { PredictionOutput } from "@/lib/types";
import { ProbabilityBar } from "./ProbabilityBar";

export function PredictionCard({ prediction }: { prediction: PredictionOutput }) {
  return (
    <section className="rounded-lg border border-sky-300/20 bg-sky-400/10 p-5">
      <p className="text-sm font-bold uppercase tracking-wide text-sky-200">Motor interno de prediccion</p>
      <div className="mt-3 text-4xl font-black text-white">{prediction.predictedHomeScore}-{prediction.predictedAwayScore}</div>
      <p className="mt-2 text-sky-100/75">{prediction.explanation}</p>
      <div className="mt-5">
        <ProbabilityBar home={prediction.homeWinProbability} draw={prediction.drawProbability} away={prediction.awayWinProbability} />
      </div>
      <p className="mt-4 text-xs text-sky-100/60">Predicciones con fines informativos y de entretenimiento. No garantizan resultados.</p>
    </section>
  );
}
