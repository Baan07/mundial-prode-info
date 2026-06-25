import { Match, Team } from "./types";

const ARGENTINA_ID = "argentina";

export function argentinaChannels(match: Match) {
  const isArgentina = match.homeTeamId === ARGENTINA_ID || match.awayTeamId === ARGENTINA_ID;
  const isOpening = match.matchNumber === 1;
  const isFinal = match.phase === "Final";

  if (isArgentina) return ["TV Publica", "Telefe", "TyC Sports", "DSports"];
  if (isOpening || isFinal) return ["TV Publica", "Telefe", "TyC Sports", "DSports"];
  return ["TyC Sports", "DSports"];
}

export function channelLabel(match: Match) {
  return argentinaChannels(match).join(" / ");
}

export function channelNote(match: Match, teams: Team[]) {
  const home = teams.find((team) => team.id === match.homeTeamId);
  const away = teams.find((team) => team.id === match.awayTeamId);
  const isArgentina = home?.id === ARGENTINA_ID || away?.id === ARGENTINA_ID;
  return isArgentina ? "Canales confirmados para Argentina" : "Grilla sujeta a confirmacion";
}
