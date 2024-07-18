interface Tournament {
  name: string;
}

interface Status {
  code: number;
  description: string;
  type: string;
}

interface Country {
  alpha2: string;
  name: string;
}

interface Team {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  nameCode: string;
  ranking: number;
  id: number;
  country: Country;
}

export interface ISofaScoreEvent {
  groundType: string;
  tournament: Tournament;
  status: Status;
  winnerCode: number;
  homeTeam: Team;
  awayTeam: Team;
  homeScore: any;
  awayScore: any;
  id: number;
  startTimestamp: number;
  finalResultOnly: boolean;
}

export interface ISofaScorePlayerData {
  name: string;
  slug: string;
  shortName: string;
  gender: string;
  sport: Sport;
  category: Category;
  tournament: Tournament;
  userCount: number;
  playerTeamInfo: PlayerTeamInfo;
  nameCode: string;
  ranking: number;
  class: number;
  disabled: boolean;
  national: boolean;
  type: number;
  id: number;
  country: Country;
  fullName: string;
  teamColors: TeamColors;
  fieldTranslations: FieldTranslations;
}

interface Sport {
  name: string;
  slug: string;
  id: number;
}

interface Category {
  name: string;
  slug: string;
  sport: Sport;
  id: number;
  country: any;
  flag: string;
}

interface Tournament {
  name: string;
  slug: string;
  category: Category;
  uniqueTournament: UniqueTournament;
  priority: number;
  isLive: boolean;
  id: number;
}

interface UniqueTournament {
  name: string;
  slug: string;
  primaryColorHex: string;
  secondaryColorHex: string;
  category: Category;
  userCount: number;
  tennisPoints: number;
  id: number;
  country: any;
  hasPerformanceGraphFeature: boolean;
  displayInverseHomeAwayTeams: boolean;
}

interface PlayerTeamInfo {
  residence: string;
  birthplace: string;
  height: number;
  weight: number;
  plays: string;
  turnedPro: string;
  prizeCurrent: number;
  prizeTotal: number;
  id: number;
  birthDateTimestamp: number;
  prizeCurrentRaw: PrizeCurrentRaw;
  prizeTotalRaw: PrizeTotalRaw;
  currentRanking: number;
}

interface PrizeCurrentRaw {
  value: number;
  currency: string;
}

interface PrizeTotalRaw {
  value: number;
  currency: string;
}

interface Country {
  alpha2: string;
  alpha3: string;
  name: string;
}

interface TeamColors {
  primary: string;
  secondary: string;
  text: string;
}

interface FieldTranslations {
  nameTranslation: { ru: string };
  shortNameTranslation: any;
}

export interface ISofaScorePlayerPerformance {
  events: ISofaScoreEvent[];
  points: { [i: number]: number };
}
