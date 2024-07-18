import { createAction, props } from '@ngrx/store';
import {
  ISofaScoreEvent,
  ISofaScorePlayerData,
  ISofaScorePlayerPerformance,
} from '../interfaces/sofascore.interfaces';
import { IPLayer } from '../interfaces/matches.interfaces';

export const searchForMatch = createAction(
  '[Sofascore] Search for match',
  props<{ p1: string; p2: string; id?: string }>()
);

export const searchForMatchSuccess = createAction(
  '[Sofascore] Search for match success',
  props<{ match: ISofaScoreEvent; id?: string }>()
);

export const searchForMatchFailure = createAction(
  '[Sofascore] Search for match failure',
  props<{ err: any }>()
);

export const searchForPlayerData = createAction(
  '[Sofascore] Search for player data',
  props<{ player: IPLayer; id: string; playerIndex: number }>()
);

export const searchForPlayerDataSuccess = createAction(
  '[Sofascore] Search for player data success',
  props<{
    matchInfo: { playerIndex: number; id: string };
    playerPerformance: ISofaScorePlayerPerformance;
  }>()
);

export const searchForPlayerDataFailure = createAction(
  '[Sofascore] Search for player data failure',
  props<{ err: any }>()
);
