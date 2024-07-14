import { createAction, props } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';

export const loadMatches = createAction('[Matches] Load matches');

export const loadMatchesSuccess = createAction(
  '[Matches] Load matches success',
  props<{ matches: IMatch[] }>()
);

export const loadMatchesFailure = createAction(
  '[Matches] Load matches failure',
  props<{ err: any }>()
);

export const newMatch = createAction(
  '[Matches] Create new match',
  props<{ match: IMatch }>()
);

export const newMatchSuccess = createAction(
  '[Matches] Create new match success',
  props<{ matches: IMatch[] }>()
);

export const newMatchFailure = createAction(
  '[Matches] Create new match failure',
  props<{ err: any }>()
);

export const deleteMatch = createAction(
  '[Matches] Delete match',
  props<{ id: string }>()
);

export const editMatch = createAction(
  '[Matches] Edit match',
  props<{ id: string; data: IMatch }>()
);

export const highlightMatch = createAction(
  '[Matches] Highlight match',
  props<{ id: string }>()
);

export const unhighlightMatch = createAction(
  '[Matches] Unhighlight match',
  props<{ id: string }>()
);
