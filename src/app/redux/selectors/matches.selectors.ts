import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MatchesState } from '../reducers/matches.reducer';

export const selectMatchesState =
  createFeatureSelector<MatchesState>('matches');

export const selectMatches = createSelector(
  selectMatchesState,
  (state: MatchesState) => state.matches
);
