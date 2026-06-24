import { TeamLineup } from "./types";

export const fallbackLineups: Record<string, TeamLineup> = {
  argentina: {
    teamId: "argentina",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Emiliano Martinez", position: "Arquero", currentClub: "Aston Villa", clubCountry: "Inglaterra", starter: true },
      { name: "Nahuel Molina", position: "Defensor", currentClub: "Atletico Madrid", clubCountry: "España", starter: true },
      { name: "Cristian Romero", position: "Defensor", currentClub: "Tottenham", clubCountry: "Inglaterra", starter: true },
      { name: "Nicolas Otamendi", position: "Defensor", currentClub: "Benfica", clubCountry: "Portugal", starter: true },
      { name: "Nicolas Tagliafico", position: "Defensor", currentClub: "Lyon", clubCountry: "Francia", starter: true },
      { name: "Rodrigo De Paul", position: "Mediocampista", currentClub: "Atletico Madrid", clubCountry: "España", starter: true },
      { name: "Enzo Fernandez", position: "Mediocampista", currentClub: "Chelsea", clubCountry: "Inglaterra", starter: true },
      { name: "Alexis Mac Allister", position: "Mediocampista", currentClub: "Liverpool", clubCountry: "Inglaterra", starter: true },
      { name: "Lionel Messi", position: "Delantero", currentClub: "Inter Miami", clubCountry: "Estados Unidos", starter: true },
      { name: "Lautaro Martinez", position: "Delantero", currentClub: "Inter", clubCountry: "Italia", starter: true },
      { name: "Julian Alvarez", position: "Delantero", currentClub: "Atletico Madrid", clubCountry: "España", starter: true },
    ],
  },
  brazil: {
    teamId: "brazil",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Alisson", position: "Arquero", currentClub: "Liverpool", clubCountry: "Inglaterra", starter: true },
      { name: "Danilo", position: "Defensor", currentClub: "Flamengo", clubCountry: "Brasil", starter: true },
      { name: "Marquinhos", position: "Defensor", currentClub: "PSG", clubCountry: "Francia", starter: true },
      { name: "Gabriel Magalhaes", position: "Defensor", currentClub: "Arsenal", clubCountry: "Inglaterra", starter: true },
      { name: "Guilherme Arana", position: "Defensor", currentClub: "Atletico Mineiro", clubCountry: "Brasil", starter: true },
      { name: "Bruno Guimaraes", position: "Mediocampista", currentClub: "Newcastle United", clubCountry: "Inglaterra", starter: true },
      { name: "Casemiro", position: "Mediocampista", currentClub: "Manchester United", clubCountry: "Inglaterra", starter: true },
      { name: "Rodrygo", position: "Delantero", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Neymar Jr.", position: "Delantero", currentClub: "Santos", clubCountry: "Brasil", starter: true },
      { name: "Vinicius Junior", position: "Delantero", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Endrick", position: "Delantero", currentClub: "Real Madrid", clubCountry: "España", starter: true },
    ],
  },
  france: {
    teamId: "france",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Mike Maignan", position: "Arquero", currentClub: "Milan", clubCountry: "Italia", starter: true },
      { name: "Jules Kounde", position: "Defensor", currentClub: "Barcelona", clubCountry: "España", starter: true },
      { name: "William Saliba", position: "Defensor", currentClub: "Arsenal", clubCountry: "Inglaterra", starter: true },
      { name: "Ibrahima Konate", position: "Defensor", currentClub: "Liverpool", clubCountry: "Inglaterra", starter: true },
      { name: "Theo Hernandez", position: "Defensor", currentClub: "Milan", clubCountry: "Italia", starter: true },
      { name: "Aurelien Tchouameni", position: "Mediocampista", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Eduardo Camavinga", position: "Mediocampista", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Antoine Griezmann", position: "Mediocampista", currentClub: "Atletico Madrid", clubCountry: "España", starter: true },
      { name: "Ousmane Dembele", position: "Delantero", currentClub: "PSG", clubCountry: "Francia", starter: true },
      { name: "Kylian Mbappe", position: "Delantero", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Marcus Thuram", position: "Delantero", currentClub: "Inter", clubCountry: "Italia", starter: true },
    ],
  },
  spain: {
    teamId: "spain",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Unai Simon", position: "Arquero", currentClub: "Athletic Club", clubCountry: "España", starter: true },
      { name: "Dani Carvajal", position: "Defensor", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Robin Le Normand", position: "Defensor", currentClub: "Atletico Madrid", clubCountry: "España", starter: true },
      { name: "Aymeric Laporte", position: "Defensor", currentClub: "Al Nassr", clubCountry: "Arabia Saudita", starter: true },
      { name: "Marc Cucurella", position: "Defensor", currentClub: "Chelsea", clubCountry: "Inglaterra", starter: true },
      { name: "Rodri", position: "Mediocampista", currentClub: "Manchester City", clubCountry: "Inglaterra", starter: true },
      { name: "Pedri", position: "Mediocampista", currentClub: "Barcelona", clubCountry: "España", starter: true },
      { name: "Fabian Ruiz", position: "Mediocampista", currentClub: "PSG", clubCountry: "Francia", starter: true },
      { name: "Lamine Yamal", position: "Delantero", currentClub: "Barcelona", clubCountry: "España", starter: true },
      { name: "Alvaro Morata", position: "Delantero", currentClub: "Galatasaray", clubCountry: "Turquia", starter: true },
      { name: "Nico Williams", position: "Delantero", currentClub: "Athletic Club", clubCountry: "España", starter: true },
    ],
  },
  england: {
    teamId: "england",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Jordan Pickford", position: "Arquero", currentClub: "Everton", clubCountry: "Inglaterra", starter: true },
      { name: "Reece James", position: "Defensor", currentClub: "Chelsea", clubCountry: "Inglaterra", starter: true },
      { name: "John Stones", position: "Defensor", currentClub: "Manchester City", clubCountry: "Inglaterra", starter: true },
      { name: "Marc Guehi", position: "Defensor", currentClub: "Crystal Palace", clubCountry: "Inglaterra", starter: true },
      { name: "Luke Shaw", position: "Defensor", currentClub: "Manchester United", clubCountry: "Inglaterra", starter: true },
      { name: "Declan Rice", position: "Mediocampista", currentClub: "Arsenal", clubCountry: "Inglaterra", starter: true },
      { name: "Kobbie Mainoo", position: "Mediocampista", currentClub: "Manchester United", clubCountry: "Inglaterra", starter: true },
      { name: "Bukayo Saka", position: "Delantero", currentClub: "Arsenal", clubCountry: "Inglaterra", starter: true },
      { name: "Jude Bellingham", position: "Mediocampista", currentClub: "Real Madrid", clubCountry: "España", starter: true },
      { name: "Phil Foden", position: "Delantero", currentClub: "Manchester City", clubCountry: "Inglaterra", starter: true },
      { name: "Harry Kane", position: "Delantero", currentClub: "Bayern Munich", clubCountry: "Alemania", starter: true },
    ],
  },
  "united-states": {
    teamId: "united-states",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Matt Turner", position: "Arquero", currentClub: "Nottingham Forest", clubCountry: "Inglaterra", starter: true },
      { name: "Sergino Dest", position: "Defensor", currentClub: "PSV", clubCountry: "Paises Bajos", starter: true },
      { name: "Chris Richards", position: "Defensor", currentClub: "Crystal Palace", clubCountry: "Inglaterra", starter: true },
      { name: "Tim Ream", position: "Defensor", currentClub: "Charlotte FC", clubCountry: "Estados Unidos", starter: true },
      { name: "Antonee Robinson", position: "Defensor", currentClub: "Fulham", clubCountry: "Inglaterra", starter: true },
      { name: "Weston McKennie", position: "Mediocampista", currentClub: "Juventus", clubCountry: "Italia", starter: true },
      { name: "Tyler Adams", position: "Mediocampista", currentClub: "Bournemouth", clubCountry: "Inglaterra", starter: true },
      { name: "Yunus Musah", position: "Mediocampista", currentClub: "Milan", clubCountry: "Italia", starter: true },
      { name: "Christian Pulisic", position: "Delantero", currentClub: "Milan", clubCountry: "Italia", starter: true },
      { name: "Folarin Balogun", position: "Delantero", currentClub: "Monaco", clubCountry: "Francia", starter: true },
      { name: "Tim Weah", position: "Delantero", currentClub: "Juventus", clubCountry: "Italia", starter: true },
    ],
  },
};

export function getFallbackLineup(teamId: string): TeamLineup {
  return fallbackLineups[teamId] ?? {
    teamId,
    formation: "Pendiente",
    source: "pending",
    players: [],
  };
}

export function getFallbackPlayers() {
  return Object.values(fallbackLineups).flatMap((lineup) =>
    lineup.players.map((player) => ({
      ...player,
      teamId: lineup.teamId,
      formation: lineup.formation,
    })),
  );
}
