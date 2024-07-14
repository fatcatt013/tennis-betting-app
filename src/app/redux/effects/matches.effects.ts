import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, switchMap, withLatestFrom } from 'rxjs';
import {
  editMatch,
  editMatchFailure,
  editMatchSuccess,
  loadMatches,
  loadMatchesFailure,
  loadMatchesSuccess,
  newMatch,
  newMatchFailure,
  newMatchSuccess,
} from '../actions/matches.actions';
import { select, Store } from '@ngrx/store';
import { selectMatches } from '../selectors/matches.selectors';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IMatch } from '../interfaces/matches.interfaces';
@Injectable()
export class MatchesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private api: ApiService
  ) {}

  loadMatches$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadMatches),
      mergeMap(() => {
        return this.api.get<{ records: IMatch[] }>('/data/matches').pipe(
          map((res: any) => loadMatchesSuccess({ matches: res.records ?? [] })),
          catchError((err: any) => of(loadMatchesFailure({ err: err })))
        );
      })
    )
  );

  newMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(newMatch),
      mergeMap(({ match }) => {
        return this.api
          .post<{ matches: IMatch[] }>('/data/matches', match)
          .pipe(
            map((res: { matches: IMatch[] }) =>
              newMatchSuccess({ matches: res.matches })
            ),
            catchError((err: any) => of(newMatchFailure({ err: err })))
          );
      })
    )
  );

  editMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editMatch),
      mergeMap(({ id, data }) => {
        return this.api
          .put<{ matches: IMatch[] }>(`/data/matches/${id}`, data)
          .pipe(
            map((res: { matches: IMatch[] }) =>
              editMatchSuccess({ matches: res.matches })
            ),
            catchError((err: any) => of(editMatchFailure({ err: err })))
          );
      })
    )
  );
}
