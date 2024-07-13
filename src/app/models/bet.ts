export interface IBet {
  match: string;
  player: string;
  odds: number;
  amount: number;
  potentialWin?: number;
}
