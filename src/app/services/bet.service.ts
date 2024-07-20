import { Injectable } from '@angular/core';
import { IBet } from '../models/bet';

@Injectable({
  providedIn: 'root'
})
export class BetService {
  private bets: IBet[] = [];

  addBet(bet: IBet) {
    bet.potentialWin = this.calculatePotentialWin(bet);
    this.bets.push(bet);
  }

  calculatePotentialWin(bet: IBet): number {
    return bet.amount * bet.odds;
  }

  getBets(): IBet[] {
    return this.bets;
  }

}
