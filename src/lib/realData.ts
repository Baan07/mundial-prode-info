import { matches as fallbackMatches, players as fallbackPlayers, teams as fallbackTeams } from "./data";
import { formatArgentinaTime, getTeamFromList } from "./matchUtils";
import { Match, MatchStatus, Team } from "./types";
import { getFallbackLineup } from "./squads";
import { supabase } from "./supabase";
import { Position, SquadPlayer, TeamLineup } from "./types";

const FIXTURES_URL = "https://www.thestatsapi.com/world-cup/data/fixtures.json";
const PROMIEDOS_WORLD_CUP_URL = "https://www.promiedos.com.ar/league/fifa-world-cup/fjda";
const PROMIEDOS_API_URL = "https://api.promiedos.com.ar";
const PROMIEDOS_VERSION = "1.11.7.3";
const FAST_CACHE_MS = 25 * 1000;
const FIXTURES_TIMEOUT_MS = 2500;
const PROMIEDOS_TIMEOUT_MS = 3500;
const PROMIEDOS_FILTER_TIMEOUT_MS = 2200;
const LIVE_API_TIMEOUT_MS = 2500;

type WorldCupData = {
  teams: Team[];
  matches: Match[];
  players: typeof fallbackPlayers;
  source: string;
  isLiveConnected: boolean;
};

let cachedWorldCupData: { expiresAt: number; data: WorldCupData } | undefined;

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
  homeScorers?: string[];
  awayScorers?: string[];
  scorers?: string[];
};

type PromiedosGame = {
  stage_round_name?: string;
  teams?: Array<{
    name?: string;
    short_name?: string;
    goals?: Array<{
      player_name?: string;
      player_sname?: string;
      time_to_display?: string;
      goal_type?: string;
    }>;
  }>;
  scores?: [number, number];
  status?: {
    enum?: number;
    name?: string;
    short_name?: string;
  };
  start_time?: string;
  game_time?: number;
  game_time_to_display?: string;
  game_time_status_to_display?: string;
};

type PromiedosTeam = NonNullable<PromiedosGame["teams"]>[number];

type PromiedosPageData = {
  props?: {
    pageProps?: {
      data?: {
        league?: {
          id?: string;
        };
        games?: {
          filters?: Array<{
            key?: string;
            games?: PromiedosGame[];
          }>;
        };
      };
    };
  };
};

type ApiFootballSquadResponse = {
  response?: Array<{
    team?: { id?: number; name?: string };
    players?: Array<{
      id?: number;
      name?: string;
      age?: number;
      number?: number;
      position?: string;
    }>;
  }>;
};

type ApiFootballTeamSearchResponse = {
  response?: Array<{
    team?: { id?: number; name?: string; national?: boolean };
  }>;
};

type EspnTeamsResponse = {
  sports?: Array<{
    leagues?: Array<{
      teams?: Array<{
        team?: {
          id?: string;
          displayName?: string;
          shortDisplayName?: string;
          slug?: string;
        };
      }>;
    }>;
  }>;
};

async function fetchWithTimeout(input: string, init: RequestInit = {}, timeoutMs = 1500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(input, {
      ...init,
      signal: controller.signal,
    });
  } finally {
    clearTimeout(timeout);
  }
}

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

const flagCodeByTeam: Record<string, string> = {
  Algeria: "dz",
  Argentina: "ar",
  Australia: "au",
  Austria: "at",
  Belgium: "be",
  "Bosnia and Herzegovina": "ba",
  Brazil: "br",
  "Cabo Verde": "cv",
  Canada: "ca",
  Colombia: "co",
  "Congo DR": "cd",
  "Cote d'Ivoire": "ci",
  Croatia: "hr",
  Curacao: "cw",
  Czechia: "cz",
  Ecuador: "ec",
  Egypt: "eg",
  England: "gb-eng",
  France: "fr",
  Germany: "de",
  Ghana: "gh",
  Haiti: "ht",
  "IR Iran": "ir",
  Iraq: "iq",
  Japan: "jp",
  Jordan: "jo",
  "Korea Republic": "kr",
  Mexico: "mx",
  Morocco: "ma",
  Netherlands: "nl",
  "New Zealand": "nz",
  Norway: "no",
  Panama: "pa",
  Paraguay: "py",
  Portugal: "pt",
  Qatar: "qa",
  "Saudi Arabia": "sa",
  Scotland: "gb-sct",
  Senegal: "sn",
  "South Africa": "za",
  Spain: "es",
  Sweden: "se",
  Switzerland: "ch",
  Tunisia: "tn",
  Turkiye: "tr",
  "United States": "us",
  Uruguay: "uy",
  Uzbekistan: "uz",
};

const spanishNameByTeam: Record<string, string> = {
  Algeria: "Argelia",
  Australia: "Australia",
  Austria: "Austria",
  Belgium: "Belgica",
  "Bosnia and Herzegovina": "Bosnia y Herzegovina",
  Brazil: "Brasil",
  "Cabo Verde": "Cabo Verde",
  Canada: "Canada",
  Colombia: "Colombia",
  "Congo DR": "RD Congo",
  "Cote d'Ivoire": "Costa de Marfil",
  Croatia: "Croacia",
  Curacao: "Curazao",
  Czechia: "Republica Checa",
  Ecuador: "Ecuador",
  Egypt: "Egipto",
  England: "Inglaterra",
  France: "Francia",
  Germany: "Alemania",
  Ghana: "Ghana",
  Haiti: "Haiti",
  "IR Iran": "Iran",
  Iraq: "Irak",
  Japan: "Japon",
  Jordan: "Jordania",
  "Korea Republic": "Corea del Sur",
  Mexico: "Mexico",
  Morocco: "Marruecos",
  Netherlands: "Paises Bajos",
  "New Zealand": "Nueva Zelanda",
  Norway: "Noruega",
  Panama: "Panama",
  Paraguay: "Paraguay",
  Portugal: "Portugal",
  Qatar: "Qatar",
  "Saudi Arabia": "Arabia Saudita",
  Scotland: "Escocia",
  Senegal: "Senegal",
  "South Africa": "Sudafrica",
  Spain: "España",
  Sweden: "Suecia",
  Switzerland: "Suiza",
  Tunisia: "Tunez",
  Turkiye: "Turquia",
  "United States": "Estados Unidos",
  Uruguay: "Uruguay",
  Uzbekistan: "Uzbekistan",
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

const apiFootballTeamNameById: Record<string, string> = {
  "cabo-verde": "Cape Verde",
  "congo-dr": "Congo DR",
  "cote-d-ivoire": "Ivory Coast",
  curacao: "Curacao",
  england: "England",
  "ir-iran": "Iran",
  "korea-republic": "South Korea",
  netherlands: "Netherlands",
  "new-zealand": "New Zealand",
  "saudi-arabia": "Saudi Arabia",
  scotland: "Scotland",
  turkiye: "Turkey",
  "united-states": "USA",
};

const espnTeamNameById: Record<string, string> = {
  "bosnia-and-herzegovina": "Bosnia-Herzegovina",
  "cabo-verde": "Cape Verde",
  "congo-dr": "Congo DR",
  "cote-d-ivoire": "Ivory Coast",
  curacao: "Curaçao",
  czechia: "Czechia",
  "ir-iran": "Iran",
  "korea-republic": "South Korea",
  "new-zealand": "New Zealand",
  "saudi-arabia": "Saudi Arabia",
  turkiye: "Türkiye",
  "united-states": "United States",
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

function statusFromPromiedos(game: PromiedosGame): MatchStatus | undefined {
  const raw = `${game.status?.name ?? ""} ${game.status?.short_name ?? ""} ${game.game_time_status_to_display ?? ""}`.toLowerCase();
  if (game.status?.enum === 3 || raw.includes("final")) return "finished";
  if (game.status?.enum === 2 || raw.includes("vivo") || raw.includes("entretiempo") || raw.includes("descanso")) return "live";
  if (game.status?.enum === 1 || raw.includes("prog")) return "scheduled";
  if (game.game_time && game.game_time > 0 && game.game_time < 130) return "live";
  return undefined;
}

function isPlaceholder(name: string) {
  return /group|winner|loser|third place|runners-up/i.test(name);
}

function translatePlaceholderTeamName(name: string) {
  return name
    .replace(/^Group ([A-Z]) winners$/i, "Ganador Grupo $1")
    .replace(/^Group ([A-Z]) runners-up$/i, "Segundo Grupo $1")
    .replace(/^Group ([A-Z/]+) third place$/i, "Mejor tercero Grupo $1")
    .replace(/^Winner match (\d+)$/i, "Ganador partido $1")
    .replace(/^Loser match (\d+)$/i, "Perdedor partido $1")
    .replace(/\bGroup\b/gi, "Grupo")
    .replace(/\bwinners\b/gi, "Ganador")
    .replace(/\brunners-up\b/gi, "Segundo")
    .replace(/\bthird place\b/gi, "Mejor tercero");
}

function flagUrlForTeam(name: string) {
  const code = flagCodeByTeam[name];
  return code ? `https://flagcdn.com/w80/${code}.png` : undefined;
}

function toTeam(name: string, group = ""): Team {
  const existing = fallbackTeams.find((team) => team.name === name || team.countryCode === name);
  const flagCode = flagCodeByTeam[name];
  const displayName = isPlaceholder(name) ? translatePlaceholderTeamName(name) : spanishNameByTeam[name];
  if (existing) {
    return {
      ...existing,
      id: slug(name),
      name: displayName ?? existing.name,
      flag: flagByTeam[name] ?? existing.flag,
      flagCode,
      flagUrl: flagUrlForTeam(name),
      group: group || existing.group,
    };
  }

  return {
    id: slug(name),
    name: displayName ?? name,
    flag: flagByTeam[name] ?? (isPlaceholder(name) ? "🏆" : "🏳️"),
    flagCode,
    flagUrl: flagUrlForTeam(name),
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
  const fallbackStatus = baseStatus === "live" ? "scheduled" : baseStatus;

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
    status: overlay?.status ?? fallbackStatus,
    homeScore: overlay?.homeScore,
    awayScore: overlay?.awayScore,
    liveMinute: overlay?.liveMinute,
    homeScorers: overlay?.homeScorers ?? [],
    awayScorers: overlay?.awayScorers ?? [],
    scorers: overlay?.scorers ?? [],
    importance: fixture.stage === "group-stage" ? 3 : 5,
    sourceUrl: fixture.matchUrl,
  };
}

async function fetchFixtures() {
  const response = await fetchWithTimeout(FIXTURES_URL, {
    next: { revalidate: 60 * 30 },
  }, FIXTURES_TIMEOUT_MS);
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

function squadPosition(value?: string): Position {
  const normalized = (value ?? "").toLowerCase();
  if (normalized === "g" || normalized.includes("goal")) return "Arquero";
  if (normalized === "d" || normalized.includes("def")) return "Defensor";
  if (normalized === "m" || normalized.includes("mid")) return "Mediocampista";
  return "Delantero";
}

function decodeHtml(value: string) {
  return value
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/<[^>]*>/g, "")
    .trim();
}

function normalizeName(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function fixtureTeamNames(name: string) {
  return [
    name,
    spanishNameByTeam[name],
    name.replace("IR Iran", "Iran"),
    name.replace("Cote d'Ivoire", "Costa de Marfil"),
    name.replace("Congo DR", "RD Congo"),
    name.replace("Bosnia and Herzegovina", "Bosnia Herzegovina"),
    name.replace("Bosnia and Herzegovina", "Bosnia-Herzegovina"),
    name.replace("Korea Republic", "Corea del Sur"),
    name.replace("United States", "Estados Unidos"),
    name.replace("Netherlands", "Paises Bajos"),
    name.replace("Turkiye", "Turquia"),
  ].filter(Boolean).map((item) => normalizeName(item));
}

function sameTeamName(promiedosName: string | undefined, fixtureName: string) {
  if (!promiedosName) return false;
  const normalized = normalizeName(promiedosName);
  return fixtureTeamNames(fixtureName).some((candidate) => candidate === normalized);
}

function scorersFromPromiedosTeam(team?: PromiedosTeam) {
  return (team?.goals ?? []).map((goal) => {
    const player = goal.player_name ?? goal.player_sname ?? "Gol";
    const minute = goal.time_to_display ? ` ${goal.time_to_display}` : "";
    const type = goal.goal_type ? ` (${goal.goal_type})` : "";
    return `${player}${minute}${type}`;
  });
}

function minuteFromPromiedos(game: PromiedosGame) {
  if (game.game_time && game.game_time > 0) return game.game_time;
  const raw = `${game.game_time_to_display ?? ""} ${game.game_time_status_to_display ?? ""}`;
  const minute = raw.match(/\d{1,3}/)?.[0];
  return minute ? Number(minute) : undefined;
}

function espnSearchName(teamId: string) {
  return espnTeamNameById[teamId] ?? apiFootballSearchName(teamId);
}

function apiFootballSearchName(teamId: string) {
  return apiFootballTeamNameById[teamId] ?? teamId.replace(/-/g, " ");
}

async function searchEspnTeamId(teamId: string) {
  try {
    const response = await fetch("https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/teams", {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return undefined;
    const payload = await response.json() as EspnTeamsResponse;
    const teams = payload.sports?.[0]?.leagues?.[0]?.teams ?? [];
    const target = normalizeName(espnSearchName(teamId));
    const match = teams.find((item) => {
      const team = item.team;
      return [team?.displayName, team?.shortDisplayName, team?.slug].some((value) => value && normalizeName(value) === target);
    });
    return match?.team?.id;
  } catch {
    return undefined;
  }
}

function parseEspnSquad(html: string, teamId: string): TeamLineup | undefined {
  const rows = html.match(/<tr class="Table__TR[\s\S]*?<\/tr>/g) ?? [];
  const fallback = getFallbackLineup(teamId);
  const clubByName = new Map(fallback.players.map((player) => [normalizeName(player.name), player.currentClub]));
  const clubCountryByName = new Map(fallback.players.map((player) => [normalizeName(player.name), player.clubCountry]));
  const players: SquadPlayer[] = [];

  for (const row of rows) {
    const nameMatch = row.match(/data-resource-id="AthleteName"[^>]*>([^<]+)<\/a>/);
    if (!nameMatch) continue;
    const positionMatch = row.match(/<td class="Table__TD"><div class="inline">([^<]*)<\/div><\/td>/);
    const numberMatch = row.match(/<span class="pl2 roster-jersey">([^<]+)<\/span>/);
    const name = decodeHtml(nameMatch[1]);
    const normalized = normalizeName(name);
    players.push({
      name,
      position: squadPosition(decodeHtml(positionMatch?.[1] ?? "")),
      shirtNumber: numberMatch ? Number(decodeHtml(numberMatch[1])) || undefined : undefined,
      currentClub: clubByName.get(normalized) ?? "Club por confirmar",
      clubCountry: clubCountryByName.get(normalized) ?? "",
      starter: true,
    });
  }

  if (players.length < 11) return undefined;
  return {
    teamId,
    formation: fallback.formation === "Pendiente" ? "Plantel" : fallback.formation,
    source: "api",
    players: players.slice(0, 26),
  };
}

async function fetchEspnLineup(teamId: string) {
  const espnTeamId = await searchEspnTeamId(teamId);
  if (!espnTeamId) return undefined;

  try {
    const response = await fetch(`https://www.espn.com/soccer/team/squad/_/id/${espnTeamId}/league/FIFA.WORLD`, {
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return undefined;
    return parseEspnSquad(await response.text(), teamId);
  } catch {
    return undefined;
  }
}

async function searchApiFootballTeamId(teamId: string) {
  const key = process.env.FOOTBALL_API_KEY;
  const baseUrl = process.env.FOOTBALL_API_BASE_URL ?? "https://v3.football.api-sports.io";
  if (!key) return undefined;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/teams?name=${encodeURIComponent(apiFootballSearchName(teamId))}`, {
      headers: { "x-apisports-key": key },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return undefined;
    const payload = await response.json() as ApiFootballTeamSearchResponse;
    const nationalTeam = payload.response?.find((item) => item.team?.national && item.team.id);
    return nationalTeam?.team?.id ?? payload.response?.find((item) => item.team?.id)?.team?.id;
  } catch {
    return undefined;
  }
}

async function fetchApiFootballLineup(teamId: string) {
  const key = process.env.FOOTBALL_API_KEY;
  const baseUrl = process.env.FOOTBALL_API_BASE_URL ?? "https://v3.football.api-sports.io";
  if (!key) return undefined;

  const apiTeamId = await searchApiFootballTeamId(teamId);
  if (!apiTeamId) return undefined;

  try {
    const response = await fetch(`${baseUrl.replace(/\/$/, "")}/players/squads?team=${apiTeamId}`, {
      headers: { "x-apisports-key": key },
      next: { revalidate: 60 * 60 * 24 },
    });
    if (!response.ok) return undefined;
    const payload = await response.json() as ApiFootballSquadResponse;
    const players = payload.response?.[0]?.players ?? [];
    if (players.length < 11) return undefined;

    const fallback = getFallbackLineup(teamId);
    const clubByName = new Map(fallback.players.map((player) => [player.name.toLowerCase(), player.currentClub]));
    const clubCountryByName = new Map(fallback.players.map((player) => [player.name.toLowerCase(), player.clubCountry]));

    return {
      teamId,
      formation: fallback.formation === "Pendiente" ? "Plantel" : fallback.formation,
      source: "api",
      players: players.slice(0, 26).map<SquadPlayer>((player) => {
        const keyName = (player.name ?? "").toLowerCase();
        return {
          name: player.name ?? "Jugador",
          position: squadPosition(player.position),
          shirtNumber: player.number,
          currentClub: clubByName.get(keyName) ?? "Club por confirmar",
          clubCountry: clubCountryByName.get(keyName) ?? "",
          starter: true,
        };
      }),
    } as TeamLineup;
  } catch {
    return undefined;
  }
}

async function fetchLiveOverlay(fixtures: StatsApiFixture[]) {
  const key = process.env.FOOTBALL_API_KEY;
  const baseUrl = process.env.FOOTBALL_API_BASE_URL ?? "https://v3.football.api-sports.io";
  if (!key) return new Map<string, LiveOverlay>();

  try {
    const response = await fetchWithTimeout(`${baseUrl.replace(/\/$/, "")}/fixtures?live=all`, {
      headers: { "x-apisports-key": key },
      next: { revalidate: 30 },
    }, LIVE_API_TIMEOUT_MS);
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

function mergeOverlay(base?: LiveOverlay, next?: LiveOverlay) {
  if (!base) return next;
  if (!next) return base;
  return {
    status: next.status ?? base.status,
    homeScore: next.homeScore ?? base.homeScore,
    awayScore: next.awayScore ?? base.awayScore,
    liveMinute: next.liveMinute ?? base.liveMinute,
    homeScorers: next.homeScorers?.length ? next.homeScorers : base.homeScorers,
    awayScorers: next.awayScorers?.length ? next.awayScorers : base.awayScorers,
    scorers: next.scorers?.length ? next.scorers : base.scorers,
  };
}

async function fetchPromiedosFilterGames(leagueId: string, key: string) {
  try {
    const response = await fetchWithTimeout(`${PROMIEDOS_API_URL}/league/games/${leagueId}/${key}`, {
      next: { revalidate: 30 },
      headers: { "X-VER": PROMIEDOS_VERSION },
    }, PROMIEDOS_FILTER_TIMEOUT_MS);
    if (!response.ok) return [];
    const payload = await response.json() as { games?: PromiedosGame[] };
    return payload.games ?? [];
  } catch {
    return [];
  }
}

async function collectPromiedosGames(payload: PromiedosPageData) {
  const data = payload.props?.pageProps?.data;
  const filters = data?.games?.filters ?? [];
  const initialGames = filters.flatMap((filter) => filter.games ?? []);
  const keysToFetch = filters
    .map((filter) => filter.key)
    .filter((key): key is string => Boolean(key && key !== "latest"));
  const leagueId = data?.league?.id;

  const fetchedGames = leagueId
    ? (await Promise.all(keysToFetch.map((key) => fetchPromiedosFilterGames(leagueId, key)))).flat()
    : [];

  const gamesByKey = new Map<string, PromiedosGame>();
  for (const game of [...initialGames, ...fetchedGames]) {
    const home = game.teams?.[0]?.name ?? game.teams?.[0]?.short_name ?? "";
    const away = game.teams?.[1]?.name ?? game.teams?.[1]?.short_name ?? "";
    const key = `${home}-${away}-${game.start_time ?? game.stage_round_name ?? ""}`;
    if (home && away && !gamesByKey.has(key)) gamesByKey.set(key, game);
  }

  return Array.from(gamesByKey.values());
}

async function fetchPromiedosOverlay(fixtures: StatsApiFixture[]) {
  try {
    const response = await fetchWithTimeout(PROMIEDOS_WORLD_CUP_URL, { next: { revalidate: 30 } }, PROMIEDOS_TIMEOUT_MS);
    if (!response.ok) return new Map<string, LiveOverlay>();
    const html = await response.text();
    const json = html.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]*?)<\/script>/)?.[1];
    if (!json) return new Map<string, LiveOverlay>();
    const payload = JSON.parse(json) as PromiedosPageData;
    const games = await collectPromiedosGames(payload);
    const overlays = new Map<string, LiveOverlay>();

    for (const game of games) {
      const home = game.teams?.[0]?.name ?? game.teams?.[0]?.short_name;
      const away = game.teams?.[1]?.name ?? game.teams?.[1]?.short_name;
      if (!home || !away) continue;
      const fixture = fixtures.find((candidate) =>
        (sameTeamName(home, candidate.homeTeam) && sameTeamName(away, candidate.awayTeam)) ||
        (sameTeamName(home, candidate.awayTeam) && sameTeamName(away, candidate.homeTeam)),
      );
      if (!fixture) continue;

      const homeIsFixtureHome = sameTeamName(home, fixture.homeTeam);
      const scores = game.scores;
      const promiedosHomeScorers = scorersFromPromiedosTeam(game.teams?.[0]);
      const promiedosAwayScorers = scorersFromPromiedosTeam(game.teams?.[1]);
      const homeScorers = homeIsFixtureHome ? promiedosHomeScorers : promiedosAwayScorers;
      const awayScorers = homeIsFixtureHome ? promiedosAwayScorers : promiedosHomeScorers;
      const overlay: LiveOverlay = {
        status: statusFromPromiedos(game),
        homeScore: scores ? scores[homeIsFixtureHome ? 0 : 1] : undefined,
        awayScore: scores ? scores[homeIsFixtureHome ? 1 : 0] : undefined,
        liveMinute: minuteFromPromiedos(game),
        homeScorers,
        awayScorers,
        scorers: [...homeScorers, ...awayScorers],
      };
      overlays.set(String(fixture.matchNumber), mergeOverlay(overlays.get(String(fixture.matchNumber)), overlay) ?? overlay);
    }

    return overlays;
  } catch {
    return new Map<string, LiveOverlay>();
  }
}

function resultLetter(goalsFor: number, goalsAgainst: number) {
  if (goalsFor > goalsAgainst) return "G";
  if (goalsFor < goalsAgainst) return "P";
  return "E";
}

function goalDifference(team: Team) {
  return team.goalsFor - team.goalsAgainst;
}

function compareGroupTeams(a: Team, b: Team) {
  if (b.points !== a.points) return b.points - a.points;
  if (goalDifference(b) !== goalDifference(a)) return goalDifference(b) - goalDifference(a);
  if (b.goalsFor !== a.goalsFor) return b.goalsFor - a.goalsFor;
  return a.name.localeCompare(b.name, "es");
}

function applyGroupStandings(teams: Team[], matches: Match[]) {
  const table = new Map<string, Team>(
    teams.map((team) => [
      team.id,
      {
        ...team,
        played: 0,
        points: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        recentForm: [],
      },
    ]),
  );

  for (const match of matches) {
    if (match.phase !== "Fase de grupos") continue;
    if (match.status === "scheduled") continue;
    if (match.homeScore === undefined || match.awayScore === undefined) continue;

    const home = table.get(match.homeTeamId);
    const away = table.get(match.awayTeamId);
    if (!home || !away) continue;

    home.played += 1;
    away.played += 1;
    home.goalsFor += match.homeScore;
    home.goalsAgainst += match.awayScore;
    away.goalsFor += match.awayScore;
    away.goalsAgainst += match.homeScore;

    if (match.homeScore > match.awayScore) {
      home.points += 3;
    } else if (match.homeScore < match.awayScore) {
      away.points += 3;
    } else {
      home.points += 1;
      away.points += 1;
    }

    home.recentForm = [resultLetter(match.homeScore, match.awayScore), ...home.recentForm].slice(0, 5);
    away.recentForm = [resultLetter(match.awayScore, match.homeScore), ...away.recentForm].slice(0, 5);
  }

  return Array.from(table.values()).map((team) => ({
    ...team,
    recentForm: team.recentForm.length ? team.recentForm : ["-", "-", "-"],
  }));
}

function buildGroupRankings(teams: Team[]) {
  const byGroup = new Map<string, Team[]>();
  for (const team of teams) {
    if (!team.group || team.played < 3) continue;
    byGroup.set(team.group, [...(byGroup.get(team.group) ?? []), team]);
  }
  for (const [group, groupTeams] of byGroup) {
    byGroup.set(group, groupTeams.sort(compareGroupTeams));
  }
  return byGroup;
}

function sourceTeamName(team: Team | undefined, sourceNameById: Map<string, string>) {
  return team ? sourceNameById.get(team.id) ?? team.name : undefined;
}

function resolveThirdPlace(groups: string[], rankings: Map<string, Team[]>, sourceNameById: Map<string, string>) {
  const candidates = groups
    .map((group) => rankings.get(group)?.[2])
    .filter((team): team is Team => Boolean(team))
    .sort(compareGroupTeams);
  return sourceTeamName(candidates[0], sourceNameById);
}

function resolveBracketTeamName(name: string, rankings: Map<string, Team[]>, sourceNameById: Map<string, string>) {
  const winner = name.match(/^Group ([A-Z]) winners$/i);
  if (winner) return sourceTeamName(rankings.get(winner[1])?.[0], sourceNameById) ?? name;

  const runnerUp = name.match(/^Group ([A-Z]) runners-up$/i);
  if (runnerUp) return sourceTeamName(rankings.get(runnerUp[1])?.[1], sourceNameById) ?? name;

  const thirdPlace = name.match(/^Group ([A-Z/]+) third place$/i);
  if (thirdPlace) return resolveThirdPlace(thirdPlace[1].split("/"), rankings, sourceNameById) ?? name;

  return name;
}

function resolveKnockoutFixtures(fixtures: StatsApiFixture[], rankings: Map<string, Team[]>, sourceNameById: Map<string, string>) {
  return fixtures.map((fixture) => {
    if (fixture.stage === "group-stage") return fixture;
    return {
      ...fixture,
      homeTeam: resolveBracketTeamName(fixture.homeTeam, rankings, sourceNameById),
      awayTeam: resolveBracketTeamName(fixture.awayTeam, rankings, sourceNameById),
    };
  });
}

export async function getWorldCupData() {
  if (cachedWorldCupData && cachedWorldCupData.expiresAt > Date.now()) {
    return cachedWorldCupData.data;
  }

  try {
    const fixtures = await fetchFixtures();
    const [promiedosOverlays, apiOverlays] = await Promise.all([
      fetchPromiedosOverlay(fixtures),
      fetchLiveOverlay(fixtures),
    ]);
    const overlays = new Map<string, LiveOverlay>();
    for (const [key, overlay] of promiedosOverlays) overlays.set(key, overlay);
    for (const [key, overlay] of apiOverlays) overlays.set(key, mergeOverlay(overlays.get(key), overlay) ?? overlay);
    const groups = new Map<string, string>();
    for (const fixture of fixtures) {
      if (fixture.group) {
        groups.set(fixture.homeTeam, fixture.group);
        groups.set(fixture.awayTeam, fixture.group);
      }
    }
    const sourceNameById = new Map<string, string>();
    const teamMap = new Map<string, Team>();
    for (const fixture of fixtures) {
      for (const teamName of [fixture.homeTeam, fixture.awayTeam]) {
        const id = slug(teamName);
        if (!isPlaceholder(teamName)) sourceNameById.set(id, teamName);
        if (!teamMap.has(id)) teamMap.set(id, toTeam(teamName, groups.get(teamName) ?? ""));
      }
    }
    const initialMatches = fixtures.map((fixture) => toMatch(fixture, overlays.get(String(fixture.matchNumber))));
    const initialTeams = applyGroupStandings(Array.from(teamMap.values()), initialMatches);
    const rankings = buildGroupRankings(initialTeams);
    const resolvedFixtures = resolveKnockoutFixtures(fixtures, rankings, sourceNameById);
    const resolvedTeamMap = new Map<string, Team>();
    for (const fixture of resolvedFixtures) {
      for (const teamName of [fixture.homeTeam, fixture.awayTeam]) {
        const id = slug(teamName);
        if (!resolvedTeamMap.has(id)) resolvedTeamMap.set(id, toTeam(teamName, groups.get(teamName) ?? ""));
      }
    }
    const matches = resolvedFixtures.map((fixture) => toMatch(fixture, overlays.get(String(fixture.matchNumber))));
    const teams = applyGroupStandings(Array.from(resolvedTeamMap.values()), matches);
    const data = {
      teams,
      matches,
      players: fallbackPlayers,
      source: "TheStatsAPI fixtures + Promiedos live + API overlay",
      isLiveConnected: Boolean(process.env.FOOTBALL_API_KEY) || promiedosOverlays.size > 0,
    };
    cachedWorldCupData = { data, expiresAt: Date.now() + FAST_CACHE_MS };
    return data;
  } catch {
    const fallbackData = {
      teams: fallbackTeams,
      matches: fallbackMatches,
      players: fallbackPlayers,
      source: "Datos locales de respaldo",
      isLiveConnected: false,
    };
    cachedWorldCupData = { data: fallbackData, expiresAt: Date.now() + 5000 };
    return fallbackData;
  }
}

export async function getRealMatch(id: string) {
  const data = await getWorldCupData();
  return {
    ...data,
    match: data.matches.find((match) => match.id === id || String(match.matchNumber) === id),
  };
}

export async function getLineup(teamId: string) {
  if (supabase) {
    const { data: lineup } = await supabase
      .from("team_lineups")
      .select("team_id, formation, source, lineup_players(name, position, current_club, club_country, shirt_number, starter)")
      .eq("team_id", teamId)
      .maybeSingle();

    if (lineup) {
      const players = ((lineup.lineup_players ?? []) as Array<{
        name: string;
        position: Position;
        current_club: string;
        club_country: string;
        shirt_number?: number;
        starter?: boolean;
      }>).map<SquadPlayer>((player) => ({
        name: player.name,
        position: player.position,
        currentClub: player.current_club,
        clubCountry: player.club_country,
        shirtNumber: player.shirt_number,
        starter: player.starter,
      }));
      return {
        teamId: lineup.team_id,
        formation: lineup.formation,
        source: lineup.source,
        players,
      } as TeamLineup;
    }
  }

  const espnLineup = await fetchEspnLineup(teamId);
  if (espnLineup) return espnLineup;

  const apiLineup = await fetchApiFootballLineup(teamId);
  if (apiLineup) return apiLineup;

  return getFallbackLineup(teamId);
}

export { formatArgentinaTime, getTeamFromList };
