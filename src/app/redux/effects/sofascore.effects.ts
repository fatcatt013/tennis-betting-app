import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap, map, catchError, of, switchMap, withLatestFrom } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import {
  searchForMatch,
  searchForMatchFailure,
  searchForMatchSuccess,
  searchForPlayerData,
  searchForPlayerDataFailure,
  searchForPlayerDataSuccess,
} from '../actions/sofascore.actions';
import { IMatch, IPLayer } from '../interfaces/matches.interfaces';
import { selectHighlightedMatches } from '../selectors/matches.selectors';
import { Store } from '@ngrx/store';
import {
  ISofaScoreEvent,
  ISofaScorePlayerData,
} from '../interfaces/sofascore.interfaces';

@Injectable()
export class SofascoreEffects {
  constructor(
    private actions$: Actions,
    private api: ApiService,
    private store: Store
  ) {}

  seachForMatch$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchForMatch),
      mergeMap(({ p1, p2, id }) => {
        return this.api
          .get<{
            records: IMatch[];
          }>(`/sofascore/search-match?players=${p1} ${p2}`)
          .pipe(
            map((res: any) => searchForMatchSuccess({ match: res.entity, id })),
            catchError((err: any) => of(searchForMatchFailure({ err: err })))
          );
      })
    )
  );

  searchForMatchSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchForMatchSuccess),
      withLatestFrom(this.store.select(selectHighlightedMatches)),
      switchMap(([{ match, id }, highlightedMatches]) => {
        const highlightedMatch = highlightedMatches.find((m) => m.id === id);

        return [
          searchForPlayerData({
            player: highlightedMatch?.playerOne as IPLayer,
            id: highlightedMatch?.id as string,
            playerIndex: 0,
          }),
          searchForPlayerData({
            player: highlightedMatch?.playerTwo as IPLayer,
            id: highlightedMatch?.id as string,
            playerIndex: 0,
          }),
        ];
      })
    )
  );

  seachForPlayerData$ = createEffect(() =>
    this.actions$.pipe(
      ofType(searchForPlayerData),
      mergeMap(({ id, player, playerIndex }) => {
        return this.api
          .getFromUrl<{
            events: ISofaScoreEvent[];
            points: { [i: number]: number };
          }>(
            `https://www.sofascore.com/api/v1/team/${player.sofascoreId}/performance`
          )
          .pipe(
            map(
              (res: {
                events: ISofaScoreEvent[];
                points: { [i: number]: number };
              }) =>
                searchForPlayerDataSuccess({
                  matchInfo: { playerIndex: playerIndex, id: id },
                  playerPerformance: res,
                })
            ),
            catchError((err: any) =>
              of(searchForPlayerDataFailure({ err: err }))
            )
          );
      })
    )
  );
}
