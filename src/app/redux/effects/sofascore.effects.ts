import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError, of } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  searchForMatch,
  searchForMatchFailure,
  searchForMatchSuccess,
} from '../actions/sofascore.actions';
import { IMatch } from '../interfaces/matches.interfaces';

@Injectable()
export class SofascoreEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService
  ) {}

  seachForMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchForMatch),
      mergeMap(({ p1, p2 }) => {
        return this.api
          .get<{
            records: IMatch[];
          }>(`/sofascore/search-match?players=${p1} ${p2}`)
          .pipe(
            map((res: any) =>
              searchForMatchSuccess({ match: res.records ?? [] })
            ),
            catchError((err: any) => of(searchForMatchFailure({ err: err })))
          );
      })
    )
  );
}
