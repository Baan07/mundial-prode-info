import { getWorldCupData } from "../realData";

export async function syncFixtures() {
  const data = await getWorldCupData();
  return { ok: true, source: data.source, synced: data.matches.length };
}

export async function syncResults() {
  const data = await getWorldCupData();
  return { ok: true, source: data.isLiveConnected ? "API-Football live overlay" : "fixtures only", synced: data.matches.length };
}

export async function syncTeams() {
  return { ok: true, source: process.env.FOOTBALL_API_BASE_URL ?? "mock", synced: 0 };
}

export async function syncPlayers() {
  return { ok: true, source: process.env.FOOTBALL_API_BASE_URL ?? "mock", synced: 0 };
}

export async function syncScorers() {
  return { ok: true, source: process.env.FOOTBALL_API_BASE_URL ?? "mock", synced: 0 };
}
