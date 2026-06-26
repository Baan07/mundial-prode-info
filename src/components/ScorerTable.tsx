import { FlagBadge } from "@/components/FlagBadge";
import { Match, Team } from "@/lib/types";

type ScorerRow = {
  player: string;
  team: Team;
  goals: number;
  minutes: string[];
};

function cleanScorerName(value: string) {
  return value
    .replace(/\s+\([^)]*\)$/g, "")
    .replace(/\s+\d{1,3}'(?:\+\d+)?$/g, "")
    .trim();
}

function scorerMinute(value: string) {
  return value.match(/\d{1,3}'(?:\+\d+)?$/)?.[0];
}

function addScorers(rows: Map<string, ScorerRow>, scorers: string[] | undefined, team: Team | undefined) {
  if (!team) return;
  for (const scorer of scorers ?? []) {
    if (/\((?:E\.?C\.?|OG|Own goal)\)/i.test(scorer)) continue;
    const player = cleanScorerName(scorer);
    if (!player) continue;
    const key = `${team.id}:${player.toLowerCase()}`;
    const existing = rows.get(key) ?? { player, team, goals: 0, minutes: [] };
    existing.goals += 1;
    const minute = scorerMinute(scorer);
    if (minute) existing.minutes.push(minute);
    rows.set(key, existing);
  }
}

export function ScorerTable({ matches, teams }: { matches: Match[]; teams: Team[] }) {
  const rowsByPlayer = new Map<string, ScorerRow>();

  for (const match of matches) {
    const home = teams.find((team) => team.id === match.homeTeamId);
    const away = teams.find((team) => team.id === match.awayTeamId);
    addScorers(rowsByPlayer, match.homeScorers, home);
    addScorers(rowsByPlayer, match.awayScorers, away);
  }

  const rows = Array.from(rowsByPlayer.values())
    .sort((a, b) => b.goals - a.goals || a.player.localeCompare(b.player, "es"))
    .slice(0, 30);

  return (
    <div className="overflow-x-auto rounded-lg border border-emerald-100/15 bg-[#062f1d]/95">
      <table className="w-full min-w-[620px] text-left text-sm">
        <thead className="bg-[#052617] text-xs uppercase text-emerald-100/60">
          <tr>
            <th className="p-3">#</th>
            <th>Jugador</th>
            <th>Seleccion</th>
            <th className="text-center">Goles</th>
            <th>Minutos</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-emerald-100/10">
          {rows.length ? (
            rows.map((row, index) => (
              <tr className="text-emerald-50" key={`${row.team.id}-${row.player}`}>
                <td className="p-3 font-black text-lime-300">{index + 1}</td>
                <td className="font-black text-white">{row.player}</td>
                <td>
                  <span className="flex min-w-0 items-center gap-2">
                    <FlagBadge size="xs" team={row.team} />
                    <span className="truncate">{row.team.name}</span>
                  </span>
                </td>
                <td className="text-center text-base font-black text-lime-300">{row.goals}</td>
                <td className="text-emerald-100/70">{row.minutes.join(", ") || "-"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="p-4 text-center font-bold text-emerald-100/60" colSpan={5}>
                Todavia no hay goles cargados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
