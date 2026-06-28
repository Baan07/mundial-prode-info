import { PredictionOutput } from "@/lib/types";
import { ProbabilityBar } from "./ProbabilityBar";

export function PredictionCard({ prediction }: { prediction: PredictionOutput }) {
  return (
    <section className="broadcast-card rounded-2xl p-5">
      <p className="text-sm font-black uppercase tracking-wide text-[#d8ff3f]">Motor interno de prediccion</p>
      <div className="mt-3 inline-flex rounded-2xl bg-[#f2efe4] px-5 py-3 font-display text-6xl leading-none text-[#101312]">
        {prediction.predictedHomeScore}-{prediction.predictedAwayScore}
      </div>
      <p className="mt-3 text-stone-300/75">{prediction.explanation}</p>
      <div className="mt-5">
        <ProbabilityBar home={prediction.homeWinProbability} draw={prediction.drawProbability} away={prediction.awayWinProbability} />
      </div>
      <p className="mt-4 text-xs text-stone-300/60">Predicciones con fines informativos y de entretenimiento. No garantizan resultados.</p>
    </section>
  );
}
