import { createAction, props } from '@ngrx/store';
import { ISofaScoreEvent } from '../interfaces/sofascore.interfaces';

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
