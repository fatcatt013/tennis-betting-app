import { IBet } from 'src/app/models/bet';

export interface IPLayer {
  startingOdds: number;
  name: string;
  photo?: string;
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
}
