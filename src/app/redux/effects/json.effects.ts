import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as JsonActions from '../actions/json.actions';

@Injectable()
export class JsonEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  loadJson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JsonActions.loadJson),
      switchMap((action) =>
        this.http.get(action.url).pipe(
          map((data: any) =>
            JsonActions.loadJsonSuccess({ data, _type: action._type })
          ),
          catchError((error) => of(JsonActions.loadJsonFailure({ error })))
        )
      )
    )
  );

  saveJson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JsonActions.saveJson),
      switchMap((action) =>
        this.http.put(action.url, action.data).pipe(
          map(() => JsonActions.saveJsonSuccess()),
          catchError((error) => of(JsonActions.saveJsonFailure({ error })))
        )
      )
    )
  );

  rewriteAndSaveJson$ = createEffect(() =>
    this.actions$.pipe(
      ofType(JsonActions.rewriteAndSaveJson),
      switchMap((action) =>
        this.http.get(action.url).pipe(
          map((data: any) => action.transformFn(data)),
          switchMap((transformedData) =>
            this.http.put(action.url, transformedData).pipe(
              map(() => JsonActions.rewriteAndSaveJsonSuccess()),
              catchError((error) =>
                of(JsonActions.rewriteAndSaveJsonFailure({ error }))
              )
            )
          )
        )
      )
    )
  );
}
