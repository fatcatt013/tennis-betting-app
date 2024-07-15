import { createReducer, on } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';
import {
  highlightMatch,
  loadMatchesSuccess,
  newMatchSuccess,
  unhighlightMatch,
} from '../actions/matches.actions';

export interface MatchesState {
  matches: IMatch[];
  highlightedMatches: IMatch[];
}

export const initialState: MatchesState = {
  matches: [],
  highlightedMatches: [],
};

export const matchesReducer = createReducer(
  initialState,
  on(loadMatchesSuccess, (_, { matches }) => ({
    ..._,
    matches: matches,
    highlightedMatches: matches.filter((match) => match.bets.length),
  })),
  on(newMatchSuccess, (_, { matches }) => ({
    ..._,
    matches: matches,
  })),
  on(highlightMatch, (state, { id }) => ({
    ...state,
    highlightedMatches: [
      ...state.highlightedMatches,
      state.matches.find((match) => {
        return match.id === id;
      }) as IMatch,
    ],
  })),
  on(unhighlightMatch, (state, { id }) => ({
    ...state,
    highlightedMatches: state.highlightedMatches.filter(
      (match) => match.id !== id
    ),
  }))
);
