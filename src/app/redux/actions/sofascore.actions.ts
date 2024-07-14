import { createAction, props } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';

export const searchForMatch = createAction(
  '[Sofascore] Search for match',
  props<{ p1: string; p2: string }>()
);

export const searchForMatchSuccess = createAction(
  '[Sofascore] Search for match success',
  props<{ match: IMatch }>()
);

export const searchForMatchFailure = createAction(
  '[Sofascore] Search for match failure',
  props<{ err: any }>()
);
