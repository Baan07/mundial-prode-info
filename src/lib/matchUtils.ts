import { Team } from "@/lib/types";

const ARGENTINA_TZ = "America/Argentina/Buenos_Aires";

export function getTeamFromList(teams: Team[], id: string) {
  return teams.find((team) => team.id === id);
}

export function formatArgentinaTime(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    hourCycle: "h23",
    timeZone: ARGENTINA_TZ,
  }).format(new Date(value));
}
