import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { distinctUntilChanged } from 'rxjs';
import {
  loadMatches,
  loadMatchesSuccess,
} from './redux/actions/matches.actions';
import { MatchSimulator } from './services/match-simulation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Live betting';
  matchesUrl = 'assets/data/matches.json';

  constructor(
    private store: Store,
    private updates$: Actions,
    private matchSimulator: MatchSimulator
  ) {}

  ngOnInit(): void {
    // const player1ServePointsWon = [65, 68, 70, 64, 66]; // Example percentages
    // const player2ServePointsWon = [60, 62, 59, 61, 63]; // Example percentages

    // const p1Serve =
    //   this.matchSimulator.getServeProbability(player1ServePointsWon) / 100;
    // const p2Serve =
    //   this.matchSimulator.getServeProbability(player2ServePointsWon) / 100;

    // const numSimulations = 10000;
    // const result = this.matchSimulator.simulateMatch(
    //   p1Serve,
    //   p2Serve,
    //   numSimulations
    // );
    // console.log(
    //   `Player 1 Win Probability: ${result.p1WinProbability.toFixed(2)}%`
    // );
    // console.log(
    //   `Player 2 Win Probability: ${result.p2WinProbability.toFixed(2)}%`
    // );

    this.store.dispatch(loadMatches());

    this.updates$
      .pipe(ofType(loadMatchesSuccess.type), distinctUntilChanged())
      .subscribe((action: any) => {
        if (action._type === 'matches') {
          console.log('MATCHES DATA:');
          console.log(action.data);
          this.store.dispatch(loadMatches());
        }
      });
  }
}
