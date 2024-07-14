import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, ofType } from '@ngrx/effects';
import { distinctUntilChanged } from 'rxjs';
import {
  loadMatches,
  loadMatchesSuccess,
} from './redux/actions/matches.actions';

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
    private updates$: Actions
  ) {}

  ngOnInit(): void {
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
