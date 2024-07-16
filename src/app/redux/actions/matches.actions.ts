import { createAction, props } from '@ngrx/store';
import { IMatch, IPLayer } from '../interfaces/matches.interfaces';

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

export const editMatchSuccess = createAction(
  '[Matches] Edit match success',
  props<{ matches: IMatch[] }>()
);

export const editMatchFailure = createAction(
  '[Matches] Edit match failure',
  props<{ err: any }>()
);

export const highlightMatch = createAction(
  '[Matches] Highlight match',
  props<{ id: string }>()
);

export const unhighlightMatch = createAction(
  '[Matches] Unhighlight match',
  props<{ id: string }>()
);

export const fetchElo = createAction(
  '[Matches] Fetch ELO',
  props<{ match: IMatch }>()
);

export const fetchEloSuccess = createAction(
  '[Matches] Fetch ELO success',
  props<{ matchId: string; player1: IPLayer; player2: IPLayer }>()
);

export const fetchEloFailure = createAction(
  '[Matches] Fetch ELO failure',
  props<{ err: any }>()
);
