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
