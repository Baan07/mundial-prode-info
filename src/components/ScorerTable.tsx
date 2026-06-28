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
  const leader = rows[0];
  const rest = rows.slice(1);

  if (!leader) {
    return (
      <div className="match-broadcast">
        <p className="text-sm font-bold text-white/62">Todavia no hay goles cargados.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
      <section className="match-broadcast">
        <p className="section-kicker">Maximo goleador</p>
        <div className="flex items-end justify-between gap-4">
          <div className="min-w-0">
            <FlagBadge size="xl" team={leader.team} />
            <h2 className="mt-4 font-display text-7xl leading-none">{leader.player}</h2>
            <p className="mt-2 text-sm font-bold text-white/58">{leader.team.name}</p>
          </div>
          <div className="match-scorebox">
            <strong>{leader.goals}</strong>
            <span className="block text-xs font-black uppercase">goles</span>
          </div>
        </div>
        <p className="mt-4 text-sm font-bold text-white/58">Minutos: {leader.minutes.join(", ") || "-"}</p>
      </section>

      <section className="grid gap-2">
        {rest.map((row, index) => (
          <article className="grid grid-cols-[42px_minmax(0,1fr)_64px] items-center gap-3 bg-white/[0.055] p-3 transition hover:bg-white/[0.1]" key={`${row.team.id}-${row.player}`}>
            <span className="font-display text-3xl leading-none text-[#d9a441]">{index + 2}</span>
            <div className="min-w-0">
              <div className="flex min-w-0 items-center gap-2">
                <FlagBadge size="xs" team={row.team} />
                <h3 className="truncate text-lg font-black">{row.player}</h3>
              </div>
              <p className="truncate text-xs font-bold text-white/50">{row.team.name} - {row.minutes.join(", ") || "sin minuto"}</p>
            </div>
            <div className="text-right">
              <strong className="font-display text-4xl leading-none">{row.goals}</strong>
              <p className="text-[10px] font-black uppercase text-white/44">goles</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
