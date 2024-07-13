import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  map,
  tap,
  distinctUntilChanged,
  catchError,
  of,
  switchMap,
  withLatestFrom,
} from 'rxjs';
import { rewriteAndSaveJson } from '../actions/json.actions';
import { newMatch } from '../actions/matches.actions';
import { select, Store } from '@ngrx/store';
import { selectMatches } from '../selectors/matches.selectors';
import { Injectable } from '@angular/core';
@Injectable()
export class MatchesEffects {
  constructor(
    private actions$: Actions,
    private store: Store
  ) {}

  newMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newMatch),
      withLatestFrom(this.store.pipe(select(selectMatches))),
      switchMap(([action, matches]) => {
        const newMatches = [...matches, action.data];
        return of(
          rewriteAndSaveJson({
            url: 'assets/data/matches.json',
            transformFn: () => newMatches,
          })
        );
      })
    )
  );
}
