import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadJson, loadJsonSuccess } from './redux/actions/json.actions';
import { Actions, ofType } from '@ngrx/effects';
import { distinctUntilChanged } from 'rxjs';
import { loadMatches } from './redux/actions/matches.actions';

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
    this.store.dispatch(loadJson({ url: this.matchesUrl, _type: 'matches' }));

    this.updates$
      .pipe(ofType(loadJsonSuccess.type), distinctUntilChanged())
      .subscribe((action: any) => {
        console.log(action);
        if (action._type === 'matches') {
          this.store.dispatch(loadMatches(action.data));
        }
      });
  }
}
