export type MatchStatus = "scheduled" | "live" | "finished";
export type Position = "Arquero" | "Defensor" | "Mediocampista" | "Delantero";

export type Team = {
  id: string;
  name: string;
  flag: string;
  countryCode: string;
  group: string;
  coach: string;
  strengthRating: number;
  played: number;
  points: number;
  goalsFor: number;
  goalsAgainst: number;
  recentForm: string[];
};

export type Player = {
  id: string;
  teamId: string;
  name: string;
  position: Position;
  shirtNumber?: number;
  age: number;
  currentClub: string;
  clubCountry: string;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  matches: number;
  minutes: number;
};

export type Match = {
  id: string;
  matchNumber?: number;
  group: string;
  phase: string;
  homeTeamId: string;
  awayTeamId: string;
  stadium: string;
  city: string;
  kickoffAt: string;
  status: MatchStatus;
  homeScore?: number;
  awayScore?: number;
  liveMinute?: number;
  scorers: string[];
  importance: number;
  sourceUrl?: string;
};

export type PredictionOutput = {
  homeWinProbability: number;
  drawProbability: number;
  awayWinProbability: number;
  predictedHomeScore: number;
  predictedAwayScore: number;
  confidence: "bajo" | "medio" | "alto";
  explanation: string;
  risk: "bajo" | "medio" | "alto";
};

export type HistoricalScorer = {
  id: string;
  playerName: string;
  country: string;
  totalGoals: number;
  worldCups: number;
  yearsPlayed: string;
};
