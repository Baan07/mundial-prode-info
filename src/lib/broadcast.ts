import { Match, Team } from "./types";

const ARGENTINA_ID = "argentina";

const channelsByMatchNumber: Record<number, string[]> = {
  55: ["DSports", "Paramount+", "Flow"],
  56: ["Telefe", "TyC Sports", "DSports", "Disney+", "Paramount+"],
  57: ["DSports", "TyC Sports", "Paramount+"],
  58: ["TV Publica", "DSports", "Paramount+"],
  59: ["TyC Sports", "DSports", "Paramount+"],
  60: ["Telefe", "DSports 2", "Disney+", "Paramount+"],
  61: ["Telefe", "TyC Sports", "DSports", "Disney+", "Paramount+"],
  62: ["DSports 2", "DGO"],
  63: ["DSports", "DGO"],
  64: ["TyC Sports", "DGO"],
  65: ["DSports 2", "DGO"],
  66: ["Telefe", "TyC Sports", "DSports", "Disney+", "Paramount+"],
  67: ["TV Publica", "TyC Sports", "DSports", "DGO"],
  68: ["DSports 2", "Flow"],
  69: ["DSports", "DGO", "Paramount+"],
  70: ["TV Publica", "Telefe", "TyC Sports", "DSports", "Disney+", "Paramount+"],
  71: ["DSports", "DGO"],
  72: ["DSports 2", "DGO"],
  74: ["TyC Sports", "TyC Sports Play"],
  75: ["DSports", "DGO"],
  76: ["Telefe", "DSports", "DGO"],
};

export function argentinaChannels(match: Match) {
  if (match.matchNumber && channelsByMatchNumber[match.matchNumber]) {
    return channelsByMatchNumber[match.matchNumber];
  }

  const isArgentina = match.homeTeamId === ARGENTINA_ID || match.awayTeamId === ARGENTINA_ID;
  const isOpening = match.matchNumber === 1;
  const isFinal = match.phase === "Final";

  if (isArgentina) return ["TV Publica", "Telefe", "TyC Sports", "DSports", "Paramount+"];
  if (isOpening || isFinal) return ["TV Publica", "Telefe", "TyC Sports", "DSports", "Paramount+"];
  return ["DSports", "Paramount+"];
}

export function channelLabel(match: Match) {
  return argentinaChannels(match).join(" / ");
}

export function channelNote(match: Match, teams: Team[]) {
  const home = teams.find((team) => team.id === match.homeTeamId);
  const away = teams.find((team) => team.id === match.awayTeamId);
  const isArgentina = home?.id === ARGENTINA_ID || away?.id === ARGENTINA_ID;
  return isArgentina || (match.matchNumber && channelsByMatchNumber[match.matchNumber]) ? "Grilla Argentina" : "Grilla sujeta a confirmacion";
}
