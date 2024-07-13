import { createReducer, on } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';
import { loadMatches } from '../actions/matches.actions';

export interface MatchesState {
  matches: IMatch[];
}

export const initialState: MatchesState = {
  matches: [],
};

export const matchesReducer = createReducer(
  initialState,
  on(loadMatches, (state, { data }) => ({
    ...state,
    matches: data,
  }))
);
