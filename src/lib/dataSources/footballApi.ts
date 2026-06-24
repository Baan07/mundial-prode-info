export async function syncFixtures() {
  return { ok: true, source: process.env.FOOTBALL_API_BASE_URL ?? "mock", synced: 0 };
}

export async function syncResults() {
  return { ok: true, source: process.env.FOOTBALL_API_BASE_URL ?? "mock", synced: 0 };
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
