import { Match, PredictionOutput, Team } from "./types";

const formScore: Record<string, number> = { G: 3, E: 1, P: 0 };

function averageForm(team: Team) {
  return team.recentForm.reduce((sum, item) => sum + formScore[item], 0) / Math.max(team.recentForm.length, 1);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

export function predictMatch(homeTeam: Team, awayTeam: Team, match: Match): PredictionOutput {
  const strengthGap = homeTeam.strengthRating - awayTeam.strengthRating;
  const formGap = averageForm(homeTeam) - averageForm(awayTeam);
  const importancePressure = match.importance >= 5 ? -2 : 0;
  const homeIndex = homeTeam.strengthRating + formGap * 4 + 1.5 + importancePressure;
  const awayIndex = awayTeam.strengthRating - formGap * 4;
  const drawBase = clamp(28 - Math.abs(strengthGap) * 0.8, 16, 31);
  const remaining = 100 - drawBase;
  const homeShare = clamp(0.5 + (homeIndex - awayIndex) / 70, 0.18, 0.82);
  const homeWinProbability = Math.round(remaining * homeShare);
  const awayWinProbability = Math.round(remaining * (1 - homeShare));
  const drawProbability = 100 - homeWinProbability - awayWinProbability;
  const expectedHome = clamp(1.1 + (homeTeam.strengthRating - 80) / 16 + formGap * 0.12, 0.2, 3.4);
  const expectedAway = clamp(1.1 + (awayTeam.strengthRating - 80) / 16 - formGap * 0.12, 0.2, 3.4);
  const predictedHomeScore = Math.max(0, Math.round(expectedHome));
  const predictedAwayScore = Math.max(0, Math.round(expectedAway));
  const confidence = Math.abs(homeWinProbability - awayWinProbability) > 25 ? "alto" : Math.abs(homeWinProbability - awayWinProbability) > 12 ? "medio" : "bajo";
  const risk = confidence === "alto" ? "bajo" : confidence === "medio" ? "medio" : "alto";
  const favorite = homeWinProbability >= awayWinProbability ? homeTeam.name : awayTeam.name;
  const explanation = `${favorite} llega con leve ventaja por fuerza estimada y forma reciente. El empate sigue pesando porque es un cruce de fase inicial.`;

  return {
    homeWinProbability,
    drawProbability,
    awayWinProbability,
    predictedHomeScore,
    predictedAwayScore,
    confidence,
    explanation,
    risk,
  };
}
