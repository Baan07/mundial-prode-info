import { HistoricalScorer, Match, Player, Team } from "./types";

export const teams: Team[] = [
  { id: "arg", name: "Argentina", flag: "🇦🇷", countryCode: "ARG", group: "A", coach: "Lionel Scaloni", strengthRating: 94, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "G", "E", "G", "G"] },
  { id: "bra", name: "Brasil", flag: "🇧🇷", countryCode: "BRA", group: "B", coach: "Dorival Junior", strengthRating: 91, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "E", "G", "P", "G"] },
  { id: "fra", name: "Francia", flag: "🇫🇷", countryCode: "FRA", group: "C", coach: "Didier Deschamps", strengthRating: 93, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "G", "P", "G", "E"] },
  { id: "esp", name: "España", flag: "🇪🇸", countryCode: "ESP", group: "D", coach: "Luis de la Fuente", strengthRating: 90, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "G", "G", "E", "G"] },
  { id: "ing", name: "Inglaterra", flag: "🏴", countryCode: "ENG", group: "E", coach: "Thomas Tuchel", strengthRating: 89, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["E", "G", "G", "P", "G"] },
  { id: "por", name: "Portugal", flag: "🇵🇹", countryCode: "POR", group: "F", coach: "Roberto Martinez", strengthRating: 88, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "P", "G", "G", "E"] },
  { id: "ger", name: "Alemania", flag: "🇩🇪", countryCode: "GER", group: "G", coach: "Julian Nagelsmann", strengthRating: 87, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "E", "G", "G", "P"] },
  { id: "uru", name: "Uruguay", flag: "🇺🇾", countryCode: "URU", group: "H", coach: "Marcelo Bielsa", strengthRating: 85, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "G", "E", "P", "G"] },
  { id: "ned", name: "Paises Bajos", flag: "🇳🇱", countryCode: "NED", group: "I", coach: "Ronald Koeman", strengthRating: 84, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["E", "G", "P", "G", "G"] },
  { id: "usa", name: "Estados Unidos", flag: "🇺🇸", countryCode: "USA", group: "J", coach: "Mauricio Pochettino", strengthRating: 79, played: 0, points: 0, goalsFor: 0, goalsAgainst: 0, recentForm: ["G", "E", "P", "G", "E"] },
];

export const players: Player[] = [
  { id: "messi", teamId: "arg", name: "Lionel Messi", position: "Delantero", shirtNumber: 10, age: 39, currentClub: "Inter Miami", clubCountry: "Estados Unidos", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "lautaro", teamId: "arg", name: "Lautaro Martinez", position: "Delantero", shirtNumber: 22, age: 28, currentClub: "Inter", clubCountry: "Italia", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "dibu", teamId: "arg", name: "Emiliano Martinez", position: "Arquero", shirtNumber: 23, age: 33, currentClub: "Aston Villa", clubCountry: "Inglaterra", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "neymar", teamId: "bra", name: "Neymar Jr.", position: "Delantero", shirtNumber: 10, age: 34, currentClub: "Santos", clubCountry: "Brasil", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "vini", teamId: "bra", name: "Vinicius Junior", position: "Delantero", shirtNumber: 7, age: 25, currentClub: "Real Madrid", clubCountry: "España", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "mbappe", teamId: "fra", name: "Kylian Mbappe", position: "Delantero", shirtNumber: 10, age: 27, currentClub: "Real Madrid", clubCountry: "España", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "griezmann", teamId: "fra", name: "Antoine Griezmann", position: "Mediocampista", shirtNumber: 7, age: 35, currentClub: "Atletico Madrid", clubCountry: "España", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "yamal", teamId: "esp", name: "Lamine Yamal", position: "Delantero", shirtNumber: 19, age: 18, currentClub: "Barcelona", clubCountry: "España", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "rodri", teamId: "esp", name: "Rodri", position: "Mediocampista", shirtNumber: 16, age: 30, currentClub: "Manchester City", clubCountry: "Inglaterra", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "kane", teamId: "ing", name: "Harry Kane", position: "Delantero", shirtNumber: 9, age: 32, currentClub: "Bayern Munich", clubCountry: "Alemania", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "bellingham", teamId: "ing", name: "Jude Bellingham", position: "Mediocampista", shirtNumber: 10, age: 22, currentClub: "Real Madrid", clubCountry: "España", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "cristiano", teamId: "por", name: "Cristiano Ronaldo", position: "Delantero", shirtNumber: 7, age: 41, currentClub: "Al Nassr", clubCountry: "Arabia Saudita", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "musiala", teamId: "ger", name: "Jamal Musiala", position: "Mediocampista", shirtNumber: 10, age: 23, currentClub: "Bayern Munich", clubCountry: "Alemania", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "darwin", teamId: "uru", name: "Darwin Nunez", position: "Delantero", shirtNumber: 9, age: 27, currentClub: "Liverpool", clubCountry: "Inglaterra", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "depay", teamId: "ned", name: "Memphis Depay", position: "Delantero", shirtNumber: 10, age: 32, currentClub: "Corinthians", clubCountry: "Brasil", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
  { id: "pulisic", teamId: "usa", name: "Christian Pulisic", position: "Delantero", shirtNumber: 10, age: 27, currentClub: "Milan", clubCountry: "Italia", goals: 0, assists: 0, yellowCards: 0, redCards: 0, matches: 0, minutes: 0 },
];

export const matches: Match[] = [
  { id: "arg-bra", group: "A", phase: "Fase de grupos", homeTeamId: "arg", awayTeamId: "bra", stadium: "MetLife Stadium", city: "New Jersey", kickoffAt: "2026-06-15T22:00:00.000Z", status: "scheduled", scorers: [], importance: 5 },
  { id: "fra-esp", group: "C", phase: "Fase de grupos", homeTeamId: "fra", awayTeamId: "esp", stadium: "SoFi Stadium", city: "Los Angeles", kickoffAt: "2026-06-16T01:00:00.000Z", status: "scheduled", scorers: [], importance: 5 },
  { id: "ing-usa", group: "E", phase: "Fase de grupos", homeTeamId: "ing", awayTeamId: "usa", stadium: "AT&T Stadium", city: "Dallas", kickoffAt: "2026-06-17T00:00:00.000Z", status: "scheduled", scorers: [], importance: 4 },
  { id: "por-ger", group: "F", phase: "Fase de grupos", homeTeamId: "por", awayTeamId: "ger", stadium: "BC Place", city: "Vancouver", kickoffAt: "2026-06-18T22:00:00.000Z", status: "scheduled", scorers: [], importance: 4 },
  { id: "uru-ned", group: "H", phase: "Fase de grupos", homeTeamId: "uru", awayTeamId: "ned", stadium: "Estadio Azteca", city: "Ciudad de Mexico", kickoffAt: "2026-06-19T19:00:00.000Z", status: "scheduled", scorers: [], importance: 4 },
  { id: "arg-usa", group: "A", phase: "Fase de grupos", homeTeamId: "arg", awayTeamId: "usa", stadium: "Hard Rock Stadium", city: "Miami", kickoffAt: "2026-06-21T01:00:00.000Z", status: "scheduled", scorers: [], importance: 3 },
  { id: "bra-fra", group: "B", phase: "Fase de grupos", homeTeamId: "bra", awayTeamId: "fra", stadium: "Lumen Field", city: "Seattle", kickoffAt: "2026-06-22T22:00:00.000Z", status: "scheduled", scorers: [], importance: 5 },
  { id: "esp-ing", group: "D", phase: "Fase de grupos", homeTeamId: "esp", awayTeamId: "ing", stadium: "Mercedes-Benz Stadium", city: "Atlanta", kickoffAt: "2026-06-23T22:00:00.000Z", status: "scheduled", scorers: [], importance: 4 },
];

export const historicalScorers: HistoricalScorer[] = [
  { id: "klose", playerName: "Miroslav Klose", country: "Alemania", totalGoals: 16, worldCups: 4, yearsPlayed: "2002, 2006, 2010, 2014" },
  { id: "ronaldo", playerName: "Ronaldo", country: "Brasil", totalGoals: 15, worldCups: 4, yearsPlayed: "1994, 1998, 2002, 2006" },
  { id: "muller", playerName: "Gerd Muller", country: "Alemania", totalGoals: 14, worldCups: 2, yearsPlayed: "1970, 1974" },
  { id: "fontaine", playerName: "Just Fontaine", country: "Francia", totalGoals: 13, worldCups: 1, yearsPlayed: "1958" },
  { id: "messi-hist", playerName: "Lionel Messi", country: "Argentina", totalGoals: 13, worldCups: 5, yearsPlayed: "2006, 2010, 2014, 2018, 2022" },
];

export const prodeRules = [
  ["Resultado exacto", 5],
  ["Ganador o empate", 2],
  ["Diferencia de gol", 1],
  ["Goleador del partido", 2],
  ["Campeon", 10],
  ["Finalista", 6],
  ["Goleador del torneo", 8],
] as const;

export function getTeam(id: string) {
  return teams.find((team) => team.id === id);
}

export function getPlayer(id: string) {
  return players.find((player) => player.id === id);
}

export function getMatch(id: string) {
  return matches.find((match) => match.id === id);
}

export function teamPlayers(teamId: string) {
  return players.filter((player) => player.teamId === teamId);
}

export function teamMatches(teamId: string) {
  return matches.filter((match) => match.homeTeamId === teamId || match.awayTeamId === teamId);
}

export function formatArgentinaTime(value: string) {
  return new Intl.DateTimeFormat("es-AR", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "America/Argentina/Buenos_Aires",
  }).format(new Date(value));
}
