import { IBet } from 'src/app/models/bet';
import {
  ISofaScorePlayerData,
  ISofaScorePlayerPerformance,
} from './sofascore.interfaces';

export interface IPLayer {
  startingOdds: number;
  name: string;
  photo?: string;
  elo?: number;
  sofascoreId: number | null;
  playerData?: ISofaScorePlayerPerformance;
}

export interface IMatch {
  id: string;
  playerOne: IPLayer;
  playerTwo: IPLayer;
  bets: IBet[];
  currentSet: 1 | 2 | 3;
  points: { playerOne: number; playerTwo: number };
  finished: boolean;
  totalMoneyInvested: number;
  potentialBets?: IBet[];
  date?: string;
  place?: string;
  groundType?: string;
}
