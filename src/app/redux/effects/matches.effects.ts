import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs';
import {
  editMatch,
  editMatchFailure,
  editMatchSuccess,
  fetchElo,
  fetchEloFailure,
  fetchEloSuccess,
  loadMatches,
  loadMatchesFailure,
  loadMatchesSuccess,
  newMatch,
  newMatchFailure,
  newMatchSuccess,
} from '../actions/matches.actions';
import { select, Store } from '@ngrx/store';
import {
  selectHighlightedMatches,
  selectMatches,
} from '../selectors/matches.selectors';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { IMatch, IPLayer } from '../interfaces/matches.interfaces';
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

  editMatchSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editMatchSuccess),
      switchMap(() => {
        return [loadMatches()];
      })
    )
  );

  fetchElo$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchElo),
      mergeMap(({ match }) => {
        return this.api
          .get<{
            player1: IPLayer;
            player2: IPLayer;
          }>(
            `/elo?${new URLSearchParams({
              player1: match.playerOne.name.replace(' ', ''),
              player2: match.playerTwo.name.replace(' ', ''),
            })}`
          )
          .pipe(
            map((res: { player1: IPLayer; player2: IPLayer }) =>
              fetchEloSuccess({
                matchId: match.id,
                player1: { ...match.playerOne, elo: res.player1.elo },
                player2: { ...match.playerOne, elo: res.player2.elo },
              })
            ),
            catchError((err: any) => of(fetchEloFailure({ err: err })))
          );
      })
    )
  );

  fetchEloSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchEloSuccess),
      withLatestFrom(this.store.select(selectHighlightedMatches)),
      switchMap(([{ matchId, player1, player2 }, highlightedMatches]) => {
        let matchToEdit = highlightedMatches.find(
          (match) => match.id === matchId
        ) as IMatch;
        let P1 = matchToEdit?.playerOne as IPLayer;
        let P2 = matchToEdit?.playerTwo as IPLayer;
        return [
          editMatch({
            id: matchId,
            data: {
              ...matchToEdit,
              playerOne: { ...P1, elo: player1.elo ?? 0 },
              playerTwo: { ...P2, elo: player2.elo ?? 0 },
            },
          }),
        ];
      })
    )
  );
}
