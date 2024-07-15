import { Injectable } from '@angular/core';
import { IMatch } from '../redux/interfaces/matches.interfaces';
import { Store } from '@ngrx/store';
import { distinctUntilChanged, first, map, Observable } from 'rxjs';
import { selectHighlightedMatches } from '../redux/selectors/matches.selectors';
import {
  highlightMatch,
  unhighlightMatch,
} from '../redux/actions/matches.actions';
import { EBetType } from '../models/bet';

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
}
