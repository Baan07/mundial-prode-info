import { TeamLineup } from "./types";
import { Position, SquadPlayer } from "./types";

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

const extraLineups: Record<string, TeamLineup> = {
  germany: {
    teamId: "germany",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Manuel Neuer", position: "Arquero", currentClub: "Bayern Munich", clubCountry: "Alemania" },
      { name: "Antonio Rudiger", position: "Defensor", currentClub: "Real Madrid", clubCountry: "Espana" },
      { name: "Joshua Kimmich", position: "Mediocampista", currentClub: "Bayern Munich", clubCountry: "Alemania" },
      { name: "Jamal Musiala", position: "Mediocampista", currentClub: "Bayern Munich", clubCountry: "Alemania" },
      { name: "Kai Havertz", position: "Delantero", currentClub: "Arsenal", clubCountry: "Inglaterra" },
    ],
  },
  ecuador: {
    teamId: "ecuador",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Hernan Galindez", position: "Arquero", currentClub: "Huracan", clubCountry: "Argentina" },
      { name: "Piero Hincapie", position: "Defensor", currentClub: "Bayer Leverkusen", clubCountry: "Alemania" },
      { name: "Willian Pacho", position: "Defensor", currentClub: "PSG", clubCountry: "Francia" },
      { name: "Moises Caicedo", position: "Mediocampista", currentClub: "Chelsea", clubCountry: "Inglaterra" },
      { name: "Enner Valencia", position: "Delantero", currentClub: "Internacional", clubCountry: "Brasil" },
    ],
  },
  paraguay: {
    teamId: "paraguay",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Gatito Fernandez", position: "Arquero", currentClub: "Botafogo", clubCountry: "Brasil" },
      { name: "Gustavo Gomez", position: "Defensor", currentClub: "Palmeiras", clubCountry: "Brasil" },
      { name: "Junior Alonso", position: "Defensor", currentClub: "Atletico Mineiro", clubCountry: "Brasil" },
      { name: "Miguel Almiron", position: "Mediocampista", currentClub: "Atlanta United", clubCountry: "Estados Unidos" },
      { name: "Julio Enciso", position: "Delantero", currentClub: "Brighton", clubCountry: "Inglaterra" },
    ],
  },
  australia: {
    teamId: "australia",
    formation: "4-4-2",
    source: "seed",
    players: [
      { name: "Mathew Ryan", position: "Arquero", currentClub: "Roma", clubCountry: "Italia" },
      { name: "Harry Souttar", position: "Defensor", currentClub: "Leicester City", clubCountry: "Inglaterra" },
      { name: "Jackson Irvine", position: "Mediocampista", currentClub: "St. Pauli", clubCountry: "Alemania" },
      { name: "Riley McGree", position: "Mediocampista", currentClub: "Middlesbrough", clubCountry: "Inglaterra" },
      { name: "Mitchell Duke", position: "Delantero", currentClub: "Machida Zelvia", clubCountry: "Japon" },
    ],
  },
  japan: {
    teamId: "japan",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Zion Suzuki", position: "Arquero", currentClub: "Parma", clubCountry: "Italia" },
      { name: "Takehiro Tomiyasu", position: "Defensor", currentClub: "Arsenal", clubCountry: "Inglaterra" },
      { name: "Wataru Endo", position: "Mediocampista", currentClub: "Liverpool", clubCountry: "Inglaterra" },
      { name: "Takefusa Kubo", position: "Mediocampista", currentClub: "Real Sociedad", clubCountry: "Espana" },
      { name: "Kaoru Mitoma", position: "Delantero", currentClub: "Brighton", clubCountry: "Inglaterra" },
    ],
  },
  sweden: {
    teamId: "sweden",
    formation: "4-4-2",
    source: "seed",
    players: [
      { name: "Viktor Johansson", position: "Arquero", currentClub: "Stoke City", clubCountry: "Inglaterra" },
      { name: "Victor Lindelof", position: "Defensor", currentClub: "Manchester United", clubCountry: "Inglaterra" },
      { name: "Dejan Kulusevski", position: "Mediocampista", currentClub: "Tottenham", clubCountry: "Inglaterra" },
      { name: "Alexander Isak", position: "Delantero", currentClub: "Newcastle United", clubCountry: "Inglaterra" },
      { name: "Viktor Gyokeres", position: "Delantero", currentClub: "Sporting CP", clubCountry: "Portugal" },
    ],
  },
  netherlands: {
    teamId: "netherlands",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Bart Verbruggen", position: "Arquero", currentClub: "Brighton", clubCountry: "Inglaterra" },
      { name: "Virgil van Dijk", position: "Defensor", currentClub: "Liverpool", clubCountry: "Inglaterra" },
      { name: "Frenkie de Jong", position: "Mediocampista", currentClub: "Barcelona", clubCountry: "Espana" },
      { name: "Xavi Simons", position: "Mediocampista", currentClub: "RB Leipzig", clubCountry: "Alemania" },
      { name: "Cody Gakpo", position: "Delantero", currentClub: "Liverpool", clubCountry: "Inglaterra" },
    ],
  },
  "united-states": {
    ...fallbackLineups["united-states"],
  },
  uruguay: {
    teamId: "uruguay",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Sergio Rochet", position: "Arquero", currentClub: "Internacional", clubCountry: "Brasil" },
      { name: "Ronald Araujo", position: "Defensor", currentClub: "Barcelona", clubCountry: "Espana" },
      { name: "Federico Valverde", position: "Mediocampista", currentClub: "Real Madrid", clubCountry: "Espana" },
      { name: "Manuel Ugarte", position: "Mediocampista", currentClub: "Manchester United", clubCountry: "Inglaterra" },
      { name: "Darwin Nunez", position: "Delantero", currentClub: "Liverpool", clubCountry: "Inglaterra" },
    ],
  },
  portugal: {
    teamId: "portugal",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Diogo Costa", position: "Arquero", currentClub: "Porto", clubCountry: "Portugal" },
      { name: "Ruben Dias", position: "Defensor", currentClub: "Manchester City", clubCountry: "Inglaterra" },
      { name: "Bruno Fernandes", position: "Mediocampista", currentClub: "Manchester United", clubCountry: "Inglaterra" },
      { name: "Bernardo Silva", position: "Mediocampista", currentClub: "Manchester City", clubCountry: "Inglaterra" },
      { name: "Cristiano Ronaldo", position: "Delantero", currentClub: "Al Nassr", clubCountry: "Arabia Saudita" },
    ],
  },
  belgium: {
    teamId: "belgium",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Thibaut Courtois", position: "Arquero", currentClub: "Real Madrid", clubCountry: "Espana" },
      { name: "Arthur Theate", position: "Defensor", currentClub: "Eintracht Frankfurt", clubCountry: "Alemania" },
      { name: "Kevin De Bruyne", position: "Mediocampista", currentClub: "Manchester City", clubCountry: "Inglaterra" },
      { name: "Jeremy Doku", position: "Delantero", currentClub: "Manchester City", clubCountry: "Inglaterra" },
      { name: "Romelu Lukaku", position: "Delantero", currentClub: "Napoli", clubCountry: "Italia" },
    ],
  },
  croatia: {
    teamId: "croatia",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Dominik Livakovic", position: "Arquero", currentClub: "Fenerbahce", clubCountry: "Turquia" },
      { name: "Josko Gvardiol", position: "Defensor", currentClub: "Manchester City", clubCountry: "Inglaterra" },
      { name: "Luka Modric", position: "Mediocampista", currentClub: "Real Madrid", clubCountry: "Espana" },
      { name: "Mateo Kovacic", position: "Mediocampista", currentClub: "Manchester City", clubCountry: "Inglaterra" },
      { name: "Andrej Kramaric", position: "Delantero", currentClub: "Hoffenheim", clubCountry: "Alemania" },
    ],
  },
  colombia: {
    teamId: "colombia",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Camilo Vargas", position: "Arquero", currentClub: "Atlas", clubCountry: "Mexico" },
      { name: "Davinson Sanchez", position: "Defensor", currentClub: "Galatasaray", clubCountry: "Turquia" },
      { name: "Jefferson Lerma", position: "Mediocampista", currentClub: "Crystal Palace", clubCountry: "Inglaterra" },
      { name: "James Rodriguez", position: "Mediocampista", currentClub: "Leon", clubCountry: "Mexico" },
      { name: "Luis Diaz", position: "Delantero", currentClub: "Liverpool", clubCountry: "Inglaterra" },
    ],
  },
  austria: {
    teamId: "austria",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Patrick Pentz", position: "Arquero", currentClub: "Brondby", clubCountry: "Dinamarca" },
      { name: "David Alaba", position: "Defensor", currentClub: "Real Madrid", clubCountry: "Espana" },
      { name: "Konrad Laimer", position: "Mediocampista", currentClub: "Bayern Munich", clubCountry: "Alemania" },
      { name: "Marcel Sabitzer", position: "Mediocampista", currentClub: "Borussia Dortmund", clubCountry: "Alemania" },
      { name: "Marko Arnautovic", position: "Delantero", currentClub: "Inter", clubCountry: "Italia" },
    ],
  },
  jordan: {
    teamId: "jordan",
    formation: "3-4-3",
    source: "seed",
    players: [
      { name: "Yazeed Abulaila", position: "Arquero", currentClub: "Al Faisaly", clubCountry: "Jordania" },
      { name: "Yazan Al-Arab", position: "Defensor", currentClub: "FC Seoul", clubCountry: "Corea del Sur" },
      { name: "Nizar Al-Rashdan", position: "Mediocampista", currentClub: "Al Faisaly", clubCountry: "Jordania" },
      { name: "Mousa Al-Tamari", position: "Delantero", currentClub: "Montpellier", clubCountry: "Francia" },
      { name: "Yazan Al-Naimat", position: "Delantero", currentClub: "Al Ahli", clubCountry: "Qatar" },
    ],
  },
  algeria: {
    teamId: "algeria",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Anthony Mandrea", position: "Arquero", currentClub: "Caen", clubCountry: "Francia" },
      { name: "Ramy Bensebaini", position: "Defensor", currentClub: "Borussia Dortmund", clubCountry: "Alemania" },
      { name: "Ismael Bennacer", position: "Mediocampista", currentClub: "Milan", clubCountry: "Italia" },
      { name: "Riyad Mahrez", position: "Delantero", currentClub: "Al Ahli", clubCountry: "Arabia Saudita" },
      { name: "Amine Gouiri", position: "Delantero", currentClub: "Marseille", clubCountry: "Francia" },
    ],
  },
  curacao: {
    teamId: "curacao",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Eloy Room", position: "Arquero", currentClub: "Vitesse", clubCountry: "Paises Bajos" },
      { name: "Cuco Martina", position: "Defensor", currentClub: "NAC Breda", clubCountry: "Paises Bajos" },
      { name: "Leandro Bacuna", position: "Mediocampista", currentClub: "FC Groningen", clubCountry: "Paises Bajos" },
      { name: "Juninho Bacuna", position: "Mediocampista", currentClub: "Birmingham City", clubCountry: "Inglaterra" },
      { name: "Jearl Margaritha", position: "Delantero", currentClub: "TOP Oss", clubCountry: "Paises Bajos" },
    ],
  },
  "cote-d-ivoire": {
    teamId: "cote-d-ivoire",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Yahia Fofana", position: "Arquero", currentClub: "Angers", clubCountry: "Francia" },
      { name: "Odilon Kossounou", position: "Defensor", currentClub: "Bayer Leverkusen", clubCountry: "Alemania" },
      { name: "Franck Kessie", position: "Mediocampista", currentClub: "Al Ahli", clubCountry: "Arabia Saudita" },
      { name: "Seko Fofana", position: "Mediocampista", currentClub: "Al Nassr", clubCountry: "Arabia Saudita" },
      { name: "Sebastien Haller", position: "Delantero", currentClub: "Borussia Dortmund", clubCountry: "Alemania" },
    ],
  },
  tunisia: {
    teamId: "tunisia",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Aymen Dahmen", position: "Arquero", currentClub: "CS Sfaxien", clubCountry: "Tunez" },
      { name: "Montassar Talbi", position: "Defensor", currentClub: "Lorient", clubCountry: "Francia" },
      { name: "Ellyes Skhiri", position: "Mediocampista", currentClub: "Eintracht Frankfurt", clubCountry: "Alemania" },
      { name: "Hannibal Mejbri", position: "Mediocampista", currentClub: "Burnley", clubCountry: "Inglaterra" },
      { name: "Youssef Msakni", position: "Delantero", currentClub: "Al Arabi", clubCountry: "Qatar" },
    ],
  },
  turkiye: {
    teamId: "turkiye",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Ugurcan Cakir", position: "Arquero", currentClub: "Trabzonspor", clubCountry: "Turquia" },
      { name: "Merih Demiral", position: "Defensor", currentClub: "Al Ahli", clubCountry: "Arabia Saudita" },
      { name: "Hakan Calhanoglu", position: "Mediocampista", currentClub: "Inter", clubCountry: "Italia" },
      { name: "Arda Guler", position: "Mediocampista", currentClub: "Real Madrid", clubCountry: "Espana" },
      { name: "Kenan Yildiz", position: "Delantero", currentClub: "Juventus", clubCountry: "Italia" },
    ],
  },
  norway: {
    teamId: "norway",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Orjan Nyland", position: "Arquero", currentClub: "Sevilla", clubCountry: "Espana" },
      { name: "Kristoffer Ajer", position: "Defensor", currentClub: "Brentford", clubCountry: "Inglaterra" },
      { name: "Sander Berge", position: "Mediocampista", currentClub: "Fulham", clubCountry: "Inglaterra" },
      { name: "Martin Odegaard", position: "Mediocampista", currentClub: "Arsenal", clubCountry: "Inglaterra" },
      { name: "Erling Haaland", position: "Delantero", currentClub: "Manchester City", clubCountry: "Inglaterra" },
    ],
  },
  senegal: {
    teamId: "senegal",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Edouard Mendy", position: "Arquero", currentClub: "Al Ahli", clubCountry: "Arabia Saudita" },
      { name: "Kalidou Koulibaly", position: "Defensor", currentClub: "Al Hilal", clubCountry: "Arabia Saudita" },
      { name: "Pape Matar Sarr", position: "Mediocampista", currentClub: "Tottenham", clubCountry: "Inglaterra" },
      { name: "Idrissa Gueye", position: "Mediocampista", currentClub: "Everton", clubCountry: "Inglaterra" },
      { name: "Nicolas Jackson", position: "Delantero", currentClub: "Chelsea", clubCountry: "Inglaterra" },
    ],
  },
  iraq: {
    teamId: "iraq",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Jalal Hassan", position: "Arquero", currentClub: "Al Zawraa", clubCountry: "Irak" },
      { name: "Rebin Sulaka", position: "Defensor", currentClub: "Brommapojkarna", clubCountry: "Suecia" },
      { name: "Amir Al-Ammari", position: "Mediocampista", currentClub: "Halmstads", clubCountry: "Suecia" },
      { name: "Ibrahim Bayesh", position: "Mediocampista", currentClub: "Al Riyadh", clubCountry: "Arabia Saudita" },
      { name: "Aymen Hussein", position: "Delantero", currentClub: "Al Khor", clubCountry: "Qatar" },
    ],
  },
  "cabo-verde": {
    teamId: "cabo-verde",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Vozinha", position: "Arquero", currentClub: "Chaves", clubCountry: "Portugal" },
      { name: "Logan Costa", position: "Defensor", currentClub: "Toulouse", clubCountry: "Francia" },
      { name: "Jamiro Monteiro", position: "Mediocampista", currentClub: "San Jose Earthquakes", clubCountry: "Estados Unidos" },
      { name: "Ryan Mendes", position: "Delantero", currentClub: "Kocaelispor", clubCountry: "Turquia" },
      { name: "Bebe", position: "Delantero", currentClub: "Rayo Vallecano", clubCountry: "Espana" },
    ],
  },
  "saudi-arabia": {
    teamId: "saudi-arabia",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Mohammed Al-Owais", position: "Arquero", currentClub: "Al Hilal", clubCountry: "Arabia Saudita" },
      { name: "Ali Al-Bulaihi", position: "Defensor", currentClub: "Al Hilal", clubCountry: "Arabia Saudita" },
      { name: "Salem Al-Dawsari", position: "Delantero", currentClub: "Al Hilal", clubCountry: "Arabia Saudita" },
      { name: "Firas Al-Buraikan", position: "Delantero", currentClub: "Al Ahli", clubCountry: "Arabia Saudita" },
      { name: "Saleh Al-Shehri", position: "Delantero", currentClub: "Al Ittihad", clubCountry: "Arabia Saudita" },
    ],
  },
  egypt: {
    teamId: "egypt",
    formation: "4-3-3",
    source: "seed",
    players: [
      { name: "Mohamed El Shenawy", position: "Arquero", currentClub: "Al Ahly", clubCountry: "Egipto" },
      { name: "Ahmed Hegazi", position: "Defensor", currentClub: "Al Ittihad", clubCountry: "Arabia Saudita" },
      { name: "Mohamed Elneny", position: "Mediocampista", currentClub: "Al Jazira", clubCountry: "Emiratos Arabes" },
      { name: "Trezeguet", position: "Delantero", currentClub: "Trabzonspor", clubCountry: "Turquia" },
      { name: "Mohamed Salah", position: "Delantero", currentClub: "Liverpool", clubCountry: "Inglaterra" },
    ],
  },
  "ir-iran": {
    teamId: "ir-iran",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Alireza Beiranvand", position: "Arquero", currentClub: "Tractor", clubCountry: "Iran" },
      { name: "Majid Hosseini", position: "Defensor", currentClub: "Kayserispor", clubCountry: "Turquia" },
      { name: "Saeid Ezatolahi", position: "Mediocampista", currentClub: "Shabab Al Ahli", clubCountry: "Emiratos Arabes" },
      { name: "Saman Ghoddos", position: "Mediocampista", currentClub: "Brentford", clubCountry: "Inglaterra" },
      { name: "Mehdi Taremi", position: "Delantero", currentClub: "Inter", clubCountry: "Italia" },
    ],
  },
  "new-zealand": {
    teamId: "new-zealand",
    formation: "4-4-2",
    source: "seed",
    players: [
      { name: "Max Crocombe", position: "Arquero", currentClub: "Burton Albion", clubCountry: "Inglaterra" },
      { name: "Winston Reid", position: "Defensor", currentClub: "Libre", clubCountry: "Nueva Zelanda" },
      { name: "Joe Bell", position: "Mediocampista", currentClub: "Viking", clubCountry: "Noruega" },
      { name: "Sarpreet Singh", position: "Mediocampista", currentClub: "Hansa Rostock", clubCountry: "Alemania" },
      { name: "Chris Wood", position: "Delantero", currentClub: "Nottingham Forest", clubCountry: "Inglaterra" },
    ],
  },
  panama: {
    teamId: "panama",
    formation: "5-4-1",
    source: "seed",
    players: [
      { name: "Orlando Mosquera", position: "Arquero", currentClub: "Maccabi Tel Aviv", clubCountry: "Israel" },
      { name: "Michael Murillo", position: "Defensor", currentClub: "Marseille", clubCountry: "Francia" },
      { name: "Andres Andrade", position: "Defensor", currentClub: "LASK", clubCountry: "Austria" },
      { name: "Adalberto Carrasquilla", position: "Mediocampista", currentClub: "Pumas UNAM", clubCountry: "Mexico" },
      { name: "Jose Fajardo", position: "Delantero", currentClub: "Universidad Catolica", clubCountry: "Ecuador" },
    ],
  },
  ghana: {
    teamId: "ghana",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Lawrence Ati-Zigi", position: "Arquero", currentClub: "St. Gallen", clubCountry: "Suiza" },
      { name: "Mohammed Salisu", position: "Defensor", currentClub: "Monaco", clubCountry: "Francia" },
      { name: "Thomas Partey", position: "Mediocampista", currentClub: "Arsenal", clubCountry: "Inglaterra" },
      { name: "Mohammed Kudus", position: "Mediocampista", currentClub: "West Ham", clubCountry: "Inglaterra" },
      { name: "Inaki Williams", position: "Delantero", currentClub: "Athletic Club", clubCountry: "Espana" },
    ],
  },
  "congo-dr": {
    teamId: "congo-dr",
    formation: "4-2-3-1",
    source: "seed",
    players: [
      { name: "Lionel Mpasi", position: "Arquero", currentClub: "Rodez", clubCountry: "Francia" },
      { name: "Chancel Mbemba", position: "Defensor", currentClub: "Marseille", clubCountry: "Francia" },
      { name: "Samuel Moutoussamy", position: "Mediocampista", currentClub: "Nantes", clubCountry: "Francia" },
      { name: "Yoane Wissa", position: "Delantero", currentClub: "Brentford", clubCountry: "Inglaterra" },
      { name: "Cedric Bakambu", position: "Delantero", currentClub: "Real Betis", clubCountry: "Espana" },
    ],
  },
  uzbekistan: {
    teamId: "uzbekistan",
    formation: "3-4-2-1",
    source: "seed",
    players: [
      { name: "Utkir Yusupov", position: "Arquero", currentClub: "Navbahor", clubCountry: "Uzbekistan" },
      { name: "Abdukodir Khusanov", position: "Defensor", currentClub: "Lens", clubCountry: "Francia" },
      { name: "Otabek Shukurov", position: "Mediocampista", currentClub: "Kayserispor", clubCountry: "Turquia" },
      { name: "Jaloliddin Masharipov", position: "Mediocampista", currentClub: "Esteghlal", clubCountry: "Iran" },
      { name: "Eldor Shomurodov", position: "Delantero", currentClub: "Roma", clubCountry: "Italia" },
    ],
  },
};

const allFallbackLineups = {
  ...fallbackLineups,
  ...extraLineups,
};

const formationPositions: Record<string, Position[]> = {
  "3-4-3": ["Arquero", "Defensor", "Defensor", "Defensor", "Mediocampista", "Mediocampista", "Mediocampista", "Mediocampista", "Delantero", "Delantero", "Delantero"],
  "3-4-2-1": ["Arquero", "Defensor", "Defensor", "Defensor", "Mediocampista", "Mediocampista", "Mediocampista", "Mediocampista", "Delantero", "Delantero", "Delantero"],
  "4-2-3-1": ["Arquero", "Defensor", "Defensor", "Defensor", "Defensor", "Mediocampista", "Mediocampista", "Mediocampista", "Mediocampista", "Mediocampista", "Delantero"],
  "4-3-3": ["Arquero", "Defensor", "Defensor", "Defensor", "Defensor", "Mediocampista", "Mediocampista", "Mediocampista", "Delantero", "Delantero", "Delantero"],
  "4-4-2": ["Arquero", "Defensor", "Defensor", "Defensor", "Defensor", "Mediocampista", "Mediocampista", "Mediocampista", "Mediocampista", "Delantero", "Delantero"],
  "5-4-1": ["Arquero", "Defensor", "Defensor", "Defensor", "Defensor", "Defensor", "Mediocampista", "Mediocampista", "Mediocampista", "Mediocampista", "Delantero"],
};

function completeLineup(lineup: TeamLineup): TeamLineup {
  const targetPositions = formationPositions[lineup.formation] ?? formationPositions["4-3-3"];
  if (lineup.players.length >= 11) return lineup;

  const usedPositions = new Map<Position, number>();
  for (const player of lineup.players) {
    usedPositions.set(player.position, (usedPositions.get(player.position) ?? 0) + 1);
  }

  const missingPlayers: SquadPlayer[] = [];
  for (const position of targetPositions) {
    const needed = targetPositions.filter((item) => item === position).length;
    const used = usedPositions.get(position) ?? 0;
    const queued = missingPlayers.filter((item) => item.position === position).length;
    if (used + queued >= needed) continue;
    missingPlayers.push({
      name: `${position} ${used + queued + 1} por confirmar`,
      position,
      currentClub: "Club por confirmar",
      clubCountry: "",
      starter: true,
    });
  }

  return {
    ...lineup,
    players: [...lineup.players, ...missingPlayers].slice(0, 11),
  };
}

export function getFallbackLineup(teamId: string): TeamLineup {
  const lineup = allFallbackLineups[teamId] ?? {
    teamId,
    formation: "4-3-3",
    source: "seed",
    players: [],
  };
  return completeLineup(lineup);
}

export function getFallbackPlayers() {
  return Object.values(allFallbackLineups).flatMap((lineup) =>
    lineup.players.map((player) => ({
      ...player,
      teamId: lineup.teamId,
      formation: lineup.formation,
    })),
  );
}
