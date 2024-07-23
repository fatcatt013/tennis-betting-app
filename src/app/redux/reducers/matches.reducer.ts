import { createReducer, on } from '@ngrx/store';
import { IMatch } from '../interfaces/matches.interfaces';
import {
  deleteMatchSuccess,
  editMatchSuccess,
  highlightMatch,
  loadMatchesSuccess,
  newMatchSuccess,
  unhighlightMatch,
} from '../actions/matches.actions';
import {
  searchForMatchSuccess,
  searchForPlayerDataSuccess,
} from '../actions/sofascore.actions';

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
  })),
  on(editMatchSuccess, (state, { matches }) => {
    const highlightedIds = state.highlightedMatches.map((match) => match.id);
    const newHighlightedMatches = matches.filter((match) =>
      highlightedIds.includes(match.id)
    );

    return {
      ...state,
      matches: matches,
      highlightedMatches: newHighlightedMatches,
    };
  }),
  on(deleteMatchSuccess, (state, { data }) => {
    const highlightedIds = state.highlightedMatches.map((match) => match.id);
    const newHighlightedMatches = data.filter((match) =>
      highlightedIds.includes(match.id)
    );

    return {
      ...state,
      matches: data,
      highlightedMatches: newHighlightedMatches,
    };
  }),
  on(searchForMatchSuccess, (state, { match, id }) => {
    let searchedMatch = state.matches.find((m) => m.id === id) as IMatch;
    let playerIds: { p1: number; p2: number } = {
      p1: match.homeTeam.id,
      p2: match.awayTeam.id,
    };
    return {
      ...state,
      matches: [
        ...state.matches.filter((m) => {
          m.id !== id;
        }),
        {
          ...searchedMatch,
          playerOne: { ...searchedMatch.playerOne, sofascoreId: playerIds.p1 },
          playerTwo: { ...searchedMatch.playerTwo, sofascoreId: playerIds.p2 },
          groundType: match.groundType
            ? match.groundType
            : searchedMatch.groundType,
        },
      ],
      highlightedMatches: [
        ...state.highlightedMatches.filter((m) => {
          m.id !== id;
        }),
        {
          ...searchedMatch,
          playerOne: { ...searchedMatch.playerOne, sofascoreId: playerIds.p1 },
          playerTwo: { ...searchedMatch.playerTwo, sofascoreId: playerIds.p2 },
          groundType: match.groundType
            ? match.groundType
            : searchedMatch.groundType,
        },
      ],
    };
  }),
  on(searchForPlayerDataSuccess, (state, { matchInfo, playerPerformance }) => {
    let searchedMatch = state.matches.find(
      (m) => m.id === matchInfo.id
    ) as IMatch;

    let modifiedSearchedMatch = {
      ...searchedMatch,
      playerOne: !matchInfo.playerIndex
        ? { ...searchedMatch.playerOne, playerData: playerPerformance }
        : searchedMatch.playerOne,
      playerTwo: matchInfo.playerIndex
        ? { ...searchedMatch.playerTwo, playerData: playerPerformance }
        : searchedMatch.playerTwo,
    };

    return {
      ...state,
      matches: [
        ...state.matches.filter((m) => {
          m.id !== matchInfo.id;
        }),
        modifiedSearchedMatch,
      ],
      highlightedMatches: [
        ...state.highlightedMatches.filter((m) => {
          m.id !== matchInfo.id;
        }),
        modifiedSearchedMatch,
      ],
    };
  })
);
