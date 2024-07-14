import { createReducer, on } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';
import {
  loadMatchesSuccess,
  newMatchSuccess,
} from '../actions/matches.actions';

export interface MatchesState {
  matches: IMatch[];
}

export const initialState: MatchesState = {
  matches: [],
};

export const matchesReducer = createReducer(
  initialState,
  on(loadMatchesSuccess, (_, { matches }) => ({
    matches: matches,
  })),
  on(newMatchSuccess, (_, { matches }) => ({
    matches: matches,
  }))
);
