import { matches as fallbackMatches, players as fallbackPlayers, teams as fallbackTeams } from "./data";
import { Match, MatchStatus, Team } from "./types";

const FIXTURES_URL = "https://www.thestatsapi.com/world-cup/data/fixtures.json";
const ARGENTINA_TZ = "America/Argentina/Buenos_Aires";

type StatsApiFixture = {
  matchNumber: number;
  date: string;
  kickoffUtc: string;
  stage: string;
  group?: string;
  homeTeam: string;
  awayTeam: string;
  stadium: string;
  hostCity: string;
  matchUrl?: string;
};

type LiveOverlay = {
  status?: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  liveMinute?: number;
  scorers?: string[];
};

const flagByTeam: Record<string, string> = {
  Algeria: "🇩🇿",
  Argentina: "🇦🇷",
  Australia: "🇦🇺",
  Austria: "🇦🇹",
  Belgium: "🇧🇪",
  "Bosnia and Herzegovina": "🇧🇦",
  Brazil: "🇧🇷",
  "Cabo Verde": "🇨🇻",
  Canada: "🇨🇦",
  Colombia: "🇨🇴",
  "Congo DR": "🇨🇩",
  "Cote d'Ivoire": "🇨🇮",
  Croatia: "🇭🇷",
  Curacao: "🇨🇼",
  Czechia: "🇨🇿",
  Ecuador: "🇪🇨",
  Egypt: "🇪🇬",
  England: "🏴",
  France: "🇫🇷",
  Germany: "🇩🇪",
  Ghana: "🇬🇭",
  Haiti: "🇭🇹",
  "IR Iran": "🇮🇷",
  Iraq: "🇮🇶",
  Japan: "🇯🇵",
  Jordan: "🇯🇴",
  "Korea Republic": "🇰🇷",
  Mexico: "🇲🇽",
  Morocco: "🇲🇦",
  Netherlands: "🇳🇱",
  "New Zealand": "🇳🇿",
  Norway: "🇳🇴",
  Panama: "🇵🇦",
  Paraguay: "🇵🇾",
  Portugal: "🇵🇹",
  Qatar: "🇶🇦",
  "Saudi Arabia": "🇸🇦",
  Scotland: "🏴",
  Senegal: "🇸🇳",
  "South Africa": "🇿🇦",
  Spain: "🇪🇸",
  Sweden: "🇸🇪",
  Switzerland: "🇨🇭",
  Tunisia: "🇹🇳",
  Turkiye: "🇹🇷",
  "United States": "🇺🇸",
  Uruguay: "🇺🇾",
  Uzbekistan: "🇺🇿",
};

const strengthByTeam: Record<string, number> = {
  Argentina: 94,
  France: 93,
  Brazil: 91,
  Spain: 90,
  England: 89,
  Portugal: 88,
  Germany: 87,
  Netherlands: 84,
  Uruguay: 85,
  Colombia: 83,
  Croatia: 82,
  Belgium: 82,
  Mexico: 80,
  "United States": 79,
  Morocco: 81,
  Japan: 78,
};

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cityName(value: string) {
  return value
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function phaseName(stage: string) {
  const names: Record<string, string> = {
    "group-stage": "Fase de grupos",
    "round-of-32": "16avos",
    "round-of-16": "Octavos",
    "quarter-final": "Cuartos",
    "semi-final": "Semifinal",
    "third-place": "Tercer puesto",
    final: "Final",
  };
  return names[stage] ?? stage.replace(/-/g, " ");
}

function statusFromKickoff(kickoffAt: string): MatchStatus {
  const now = Date.now();
  const start = new Date(kickoffAt).getTime();
  const liveWindowMs = 125 * 60 * 1000;
  if (Number.isNaN(start)) return "scheduled";
  if (now < start) return "scheduled";
  if (now <= start + liveWindowMs) return "live";
  return "finished";
}

function isPlaceholder(name: string) {
  return /group|winner|loser|third place|runners-up/i.test(name);
}

function toTeam(name: string, group = ""): Team {
  const existing = fallbackTeams.find((team) => team.name === name || team.countryCode === name);
  if (existing) return { ...existing, flag: flagByTeam[name] ?? existing.flag, group: group || existing.group };

  return {
    id: slug(name),
    name,
    flag: flagByTeam[name] ?? (isPlaceholder(name) ? "🏆" : "🏳️"),
    countryCode: slug(name).slice(0, 3).toUpperCase(),
    group,
    coach: "",
    strengthRating: strengthByTeam[name] ?? (isPlaceholder(name) ? 75 : 76),
    played: 0,
    points: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    recentForm: ["E", "E", "E"],
  };
}

function toMatch(fixture: StatsApiFixture, overlay?: LiveOverlay): Match {
  const homeTeamId = slug(fixture.homeTeam);
  const awayTeamId = slug(fixture.awayTeam);
  const baseStatus = statusFromKickoff(fixture.kickoffUtc);

  return {
    id: `m-${fixture.matchNumber}`,
    matchNumber: fixture.matchNumber,
    group: fixture.group ?? "",
    phase: phaseName(fixture.stage),
    homeTeamId,
    awayTeamId,
    stadium: fixture.stadium,
    city: cityName(fixture.hostCity),
    kickoffAt: fixture.kickoffUtc,
    status: overlay?.status ?? baseStatus,
    homeScore: overlay?.homeScore,
    awayScore: overlay?.awayScore,
    liveMinute: overlay?.liveMinute,
    scorers: overlay?.scorers ?? [],
    importance: fixture.stage === "group-stage" ? 3 : 5,
    sourceUrl: fixture.matchUrl,
  };
}

async function fetchFixtures() {
  const response = await fetch(FIXTURES_URL, {
    next: { revalidate: 60 * 30 },
  });
  if (!response.ok) throw new Error("No se pudo cargar fixtures reales");
  const payload = (await response.json()) as { fixtures: StatsApiFixture[] };
  return payload.fixtures;
}

function apiFootballStatus(shortStatus?: string): MatchStatus | undefined {
  if (!shortStatus) return undefined;
  if (["1H", "HT", "2H", "ET", "BT", "P", "SUSP", "INT", "LIVE"].includes(shortStatus)) return "live";
  if (["FT", "AET", "PEN"].includes(shortStatus)) return "finished";
  if (["NS", "TBD"].includes(shortStatus)) return "scheduled";
  return undefined;
}

async function fetchLiveOverlay(fixtures: StatsApiFixture[]) {
  const key = process.env.FOOTBALL_API_KEY;
  const baseUrl = process.env.FOOTBALL_API_BASE_URL ?? "https://v3.football.api-sports.io";
  if (!key) return new Map<string, LiveOverlay>();

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/fixtures?live=all`, {
      headers: { "x-apisports-key": key },
      cache: "no-store",
    });
    if (!response.ok) return new Map<string, LiveOverlay>();
    const payload = await response.json() as {
      response?: Array<{
        fixture?: { status?: { short?: string; elapsed?: number } };
        teams?: { home?: { name?: string }; away?: { name?: string } };
        goals?: { home?: number; away?: number };
      }>;
    };
    const overlays = new Map<string, LiveOverlay>();
    for (const item of payload.response ?? []) {
      const home = item.teams?.home?.name;
      const away = item.teams?.away?.name;
      if (!home || !away) continue;
      const fixture = fixtures.find((candidate) => {
        const h = candidate.homeTeam.toLowerCase();
        const a = candidate.awayTeam.toLowerCase();
        return h.includes(home.toLowerCase()) || a.includes(away.toLowerCase());
      });
      if (!fixture) continue;
      overlays.set(String(fixture.matchNumber), {
        status: apiFootballStatus(item.fixture?.status?.short),
        homeScore: item.goals?.home ?? undefined,
        awayScore: item.goals?.away ?? undefined,
        liveMinute: item.fixture?.status?.elapsed,
      });
    }
    return overlays;
  } catch {
    return new Map<string, LiveOverlay>();
  }
}

export async function getWorldCupData() {
  try {
    const fixtures = await fetchFixtures();
    const overlays = await fetchLiveOverlay(fixtures);
    const groups = new Map<string, string>();
    for (const fixture of fixtures) {
      if (fixture.group) {
        groups.set(fixture.homeTeam, fixture.group);
        groups.set(fixture.awayTeam, fixture.group);
      }
    }
    const teamMap = new Map<string, Team>();
    for (const fixture of fixtures) {
      for (const teamName of [fixture.homeTeam, fixture.awayTeam]) {
        const id = slug(teamName);
        if (!teamMap.has(id)) teamMap.set(id, toTeam(teamName, groups.get(teamName) ?? ""));
      }
    }
    return {
      teams: Array.from(teamMap.values()),
      matches: fixtures.map((fixture) => toMatch(fixture, overlays.get(String(fixture.matchNumber)))),
      players: fallbackPlayers,
      source: "TheStatsAPI fixtures + live API overlay",
      isLiveConnected: Boolean(process.env.FOOTBALL_API_KEY),
    };
  } catch {
    return {
      teams: fallbackTeams,
      matches: fallbackMatches,
      players: fallbackPlayers,
      source: "Datos locales de respaldo",
      isLiveConnected: false,
    };
  }
}

export async function getRealMatch(id: string) {
  const data = await getWorldCupData();
  return {
    ...data,
    match: data.matches.find((match) => match.id === id || String(match.matchNumber) === id),
  };
}

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
    timeZone: ARGENTINA_TZ,
  }).format(new Date(value));
}
