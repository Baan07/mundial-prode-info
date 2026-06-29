import { Team } from "@/lib/types";
const ARGENTINA_OFFSET_MS = 3 * 60 * 60 * 1000;
const WEEKDAYS = ["dom", "lun", "mar", "mie", "jue", "vie", "sab"];
const MONTHS = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];

export function getTeamFromList(teams: Team[], id: string) {
  return teams.find((team) => team.id === id);
}

export function formatArgentinaTime(value: string) {
  const argentinaDate = new Date(new Date(value).getTime() - ARGENTINA_OFFSET_MS);
  const weekday = WEEKDAYS[argentinaDate.getUTCDay()];
  const day = String(argentinaDate.getUTCDate()).padStart(2, "0");
  const month = MONTHS[argentinaDate.getUTCMonth()];
  const hour = String(argentinaDate.getUTCHours()).padStart(2, "0");
  const minute = String(argentinaDate.getUTCMinutes()).padStart(2, "0");
  return `${weekday}, ${day} ${month}, ${hour}:${minute}`;
}
