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
  deleteMatch,
  deleteMatchFailure,
  deleteMatchSuccess,
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
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class MatchesEffects {
  constructor(
    private actions$: Actions,
    private store: Store,
    private api: ApiService,
    private toastr: ToastrService
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

  loadMatchesSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMatchesSuccess),
        tap(() => {
          this.toastr.success('Matches loaded successfully');
        })
      ),
    { dispatch: false }
  );

  loadMatchesFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loadMatchesFailure),
        tap(() => {
          this.toastr.error('Failed to load matches');
        })
      ),
    { dispatch: false }
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

  newMatchSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(newMatchSuccess),
        tap(() => {
          this.toastr.success('New match added successfully');
        })
      ),
    { dispatch: false }
  );

  newMatchFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(newMatchFailure),
        tap(() => {
          this.toastr.error('Failed to add new match');
        })
      ),
    { dispatch: false }
  );

  editMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editMatch),
      mergeMap(({ id, data }) => {
        let strippedData = {
          ...data,
          playerOne: {
            ...data.playerOne,
            playerData: undefined,
          },
          playerTwo: {
            ...data.playerTwo,
            playerData: undefined,
          },
          bets: data.bets.map((bet) => {
            return {
              ...bet,
              player: {
                ...bet.player,
                playerData: undefined,
              },
            };
          }),
        };

        return this.api
          .put<{ matches: IMatch[] }>(`/data/matches/${id}`, strippedData)
          .pipe(
            map((res: { matches: IMatch[] }) =>
              editMatchSuccess({ matches: res.matches })
            ),
            catchError((err: any) => of(editMatchFailure({ err: err })))
          );
      })
    )
  );

  editMatchSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editMatchSuccess),
        tap(() => {
          this.toastr.success('Match edited successfully');
        })
      ),
    { dispatch: false }
  );

  editMatchFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(editMatchFailure),
        tap(() => {
          this.toastr.error('Failed to edit match');
        })
      ),
    { dispatch: false }
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
              player1: match.playerOne.name.replaceAll(' ', ''),
              player2: match.playerTwo.name.replaceAll(' ', ''),
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
      }),
      tap(() => {
        this.toastr.success('Elo fetched and match updated successfully');
      })
    )
  );

  fetchEloFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(fetchEloFailure),
        tap(() => {
          this.toastr.error('Failed to fetch Elo');
        })
      ),
    { dispatch: false }
  );

  deleteMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMatch),
      mergeMap(({ id }) => {
        return this.api
          .delete<{ matches: IMatch[] }>(`/data/matches/${id}`)
          .pipe(
            map((res: { matches: IMatch[] }) =>
              deleteMatchSuccess({ data: res.matches })
            ),
            catchError((err: any) => of(deleteMatchFailure({ error: err })))
          );
      })
    )
  );

  deleteMatchSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteMatchSuccess),
      switchMap(() => {
        return [loadMatches()];
      }),
      tap(() => {
        this.toastr.success('Match deleted successfully');
      })
    )
  );

  deleteMatchFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(deleteMatchFailure),
        tap(() => {
          this.toastr.error('Failed to delete match');
        })
      ),
    { dispatch: false }
  );
}
