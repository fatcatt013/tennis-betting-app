import { createAction, props } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';

export const loadMatches = createAction(
  '[Matches] Load matches',
  props<{ data: IMatch[] }>()
);

export const newMatch = createAction(
  '[Matches] Create new match',
  props<{ data: IMatch }>()
);

export const deleteMatch = createAction(
  '[Matches] Delete match',
  props<{ id: string }>()
);

export const editMatch = createAction(
  '[Matches] Edit match',
  props<{ id: string; data: IMatch }>()
);
