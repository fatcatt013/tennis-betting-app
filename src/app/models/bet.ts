import { IPLayer } from '../redux/interfaces/matches.interfaces';

export enum EBetType {
  MATCH_WIN = 'match_win',
  FIRST_SET_WIN = 'first_set_win',
  SECOND_SET_WIN = 'second_set_win',
}

export interface IBetType {
  value: EBetType;
  label: string;
}

export interface IBet {
  matchId: string;
  id: string;
  player: IPLayer;
  odds: number;
  amount: number;
  potentialWin?: number;
  type: EBetType;
}
