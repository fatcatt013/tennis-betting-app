import { Injectable } from '@angular/core';
import { IMatch } from '../redux/interfaces/matches.interfaces';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, first, map, Observable } from 'rxjs';
import { selectHighlightedMatches } from '../redux/selectors/matches.selectors';
import {
  highlightMatch,
  unhighlightMatch,
} from '../redux/actions/matches.actions';
import { EBetType, IBet } from '../models/bet';

@Injectable({
  providedIn: 'root',
})
export class MatchesService {
  constructor(private store: Store) {}
  highlightedMatches$: Observable<IMatch[]> = this.store.select(
    selectHighlightedMatches
  );

  isHighlighted(id: string): Observable<boolean> {
    return this.highlightedMatches$.pipe(
      distinctUntilChanged(),
      map((hMs: IMatch[]) => hMs.some((hM) => hM.id === id)),
      first()
    );
  }

  handleHighlight(id: string) {
    this.store.dispatch(highlightMatch({ id }));
  }

  handleUnhighlight(id: string) {
    this.store.dispatch(unhighlightMatch({ id }));
  }

  getMatchTabHeader(match: IMatch): string {
    return (
      match.playerOne.name.split(' ')[1] +
      ' - ' +
      match.playerTwo.name.split(' ')[1]
    );
  }

  calculatePotentialResults(matches: IMatch[]): any {
    const results = matches.map((match) => {
      const outcomes = {
        [match.playerOne.name]: {
          firstSetWin: 0,
          secondSetWin: 0,
          matchWin: 0,
          totalWin: 0,
        },
        [match.playerTwo.name]: {
          firstSetWin: 0,
          secondSetWin: 0,
          matchWin: 0,
          totalWin: 0,
        },
      };

      match.bets.forEach((bet) => {
        const { player, type, amount, odds } = bet;

        switch (type) {
          case EBetType.FIRST_SET_WIN:
            outcomes[player.name].firstSetWin += parseInt(
              (amount * odds).toFixed(2)
            );
            break;
          case EBetType.SECOND_SET_WIN:
            outcomes[player.name].secondSetWin += parseInt(
              (amount * odds).toFixed(2)
            );
            break;
          case EBetType.MATCH_WIN:
            outcomes[player.name].matchWin += parseInt(
              (amount * odds).toFixed(2)
            );
            break;
          // Add more cases if needed for other bet types
        }
      });

      // Calculate the total potential win for each player
      outcomes[match.playerOne.name].totalWin =
        outcomes[match.playerOne.name].firstSetWin +
        outcomes[match.playerOne.name].secondSetWin +
        outcomes[match.playerOne.name].matchWin;

      outcomes[match.playerTwo.name].totalWin =
        outcomes[match.playerTwo.name].firstSetWin +
        outcomes[match.playerTwo.name].secondSetWin +
        outcomes[match.playerTwo.name].matchWin;

      return {
        matchId: match.id,
        outcomes,
      };
    });

    return results;
  }

  calculatePotentialOutcomes(match: IMatch) {
    let P1 = match.playerOne.name.split(' ')[1];
    let P2 = match.playerTwo.name.split(' ')[1];

    const outcomes = [
      // Player 1 wins scenarios
      { sets: `${P1} wins 1. set, ${P1} wins 2. set`, p1: true, p2: false },
      {
        sets: `${P1} wins 1. set, ${P2} wins 2. set, ${P1} wins 3. set`,
        p1: true,
        p2: false,
      },
      {
        sets: `${P2} wins 1. set, ${P1} wins 2. set, ${P1} wins 3. set`,
        p1: true,
        p2: false,
      },
      // Player 2 wins scenarios
      { sets: `${P2} wins 1. set, ${P2} wins 2. set`, p1: false, p2: true },
      {
        sets: `${P2} wins 1. set, ${P1} wins 2. set, ${P2} wins 3. set`,
        p1: false,
        p2: true,
      },
      {
        sets: `${P1} wins 1. set, ${P2} wins 2. set, ${P2} wins 3. set`,
        p1: false,
        p2: true,
      },
    ];

    return outcomes.map((outcome) => {
      let profit = 0;

      match.bets.forEach((bet) => {
        const { player, type, amount, odds } = bet;

        if (type === EBetType.MATCH_WIN) {
          if (
            (player.name === match.playerOne.name && outcome.p1) ||
            (player.name === match.playerTwo.name && outcome.p2)
          ) {
            profit += amount * odds - amount;
          } else {
            profit -= amount;
          }
        } else if (
          type === EBetType.FIRST_SET_WIN &&
          outcome.sets.includes('1. set')
        ) {
          if (
            (player.name === match.playerOne.name &&
              outcome.sets.startsWith(`${P1}`)) ||
            (player.name === match.playerTwo.name &&
              outcome.sets.startsWith(`${P2}`))
          ) {
            profit += amount * odds - amount;
          } else {
            profit -= amount;
          }
        } else if (
          type === EBetType.SECOND_SET_WIN &&
          outcome.sets.includes('2. set')
        ) {
          const secondSetOutcome = outcome.sets
            .split(', ')[1]
            .startsWith(`${P1}`);
          if (
            (player.name === match.playerOne.name && secondSetOutcome) ||
            (player.name === match.playerTwo.name && !secondSetOutcome)
          ) {
            profit += amount * odds - amount;
          } else {
            profit -= amount;
          }
        }
      });

      return {
        outcome: outcome.sets,
        profit,
      };
    });
  }

  formatOutcomeSets(outcome: string): string {
    return outcome
      .replace(/wins \d+\. set/g, '')
      .replace(/,\s+/g, ', ')
      .trim();
  }

  calculateExpectedValue(match: IMatch): number {
    let totalEV = 0;

    // Define probabilities for outcomes (these should be based on real data/analysis)
    const probabilities = this.calculateProbabilities(match);

    for (const bet of match.bets) {
      const outcome = this.determineOutcome(bet, probabilities);
      const winAmount = bet.odds * bet.amount - bet.amount; // Net profit if the bet wins
      const loseAmount = -bet.amount; // Loss if the bet loses

      const betEV = outcome.pWin * winAmount + outcome.pLose * loseAmount;
      totalEV += betEV;
    }

    return totalEV;
  }

  calculateProbabilities(match: IMatch): { [key: string]: number } {
    // Example probabilities; these should be based on real analysis
    return {
      Player1_Wins_Match: 0.498,
      Player2_Wins_Match: 0.571,
      Player1_Wins_First_Set: 0.498,
      Player2_Wins_First_Set: 0.571,
      // Add other probabilities as needed
    };
  }

  determineOutcome(
    bet: IBet,
    probabilities: { [key: string]: number }
  ): { pWin: number; pLose: number } {
    let pWin: number;
    switch (bet.type) {
      case EBetType.MATCH_WIN:
        pWin =
          bet.player.name === 'Player 1'
            ? probabilities['Player1_Wins_Match']
            : probabilities['Player2_Wins_Match'];
        break;
      case EBetType.FIRST_SET_WIN:
        pWin =
          bet.player.name === 'Player 1'
            ? probabilities['Player1_Wins_First_Set']
            : probabilities['Player2_Wins_First_Set'];
        break;
      // Add other bet types as needed
      default:
        pWin = 0;
    }
    return { pWin, pLose: 1 - pWin };
  }

  // A helper function to calculate implied probability from odds
  calculateProbability(odds: number): number {
    return 1 / odds;
  }
}
