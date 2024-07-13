export enum EBetType {
  MATCH_WIN = 'match_win',
  FIRST_SET_WIN = 'first_set_win',
  SECOND_SET_WIN = 'second_set_win',
}

export interface IBet {
  matchId: string;
  player: string;
  odds: number;
  amount: number;
  potentialWin?: number;
  type: EBetType;
}
