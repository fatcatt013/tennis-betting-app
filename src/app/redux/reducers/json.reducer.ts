import { Action, createReducer, on } from '@ngrx/store';
import * as JsonActions from '../actions/json.actions';

export interface JsonState {
  data: any;
  loading: boolean;
  error: any;
}

export const initialState: JsonState = {
  data: null,
  loading: false,
  error: null,
};

export const jsonReducer = createReducer(
  initialState,
  on(JsonActions.loadJson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(JsonActions.loadJsonSuccess, (state, { data }) => ({
    ...state,
    data: data,
    loading: false,
    error: null,
  })),
  on(JsonActions.loadJsonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(JsonActions.saveJson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(JsonActions.saveJsonSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(JsonActions.saveJsonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  })),
  on(JsonActions.rewriteAndSaveJson, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(JsonActions.rewriteAndSaveJsonSuccess, (state) => ({
    ...state,
    loading: false,
    error: null,
  })),
  on(JsonActions.rewriteAndSaveJsonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error: error,
  }))
);

export function reducer(state: JsonState | undefined, action: Action) {
  return jsonReducer(state, action);
}
