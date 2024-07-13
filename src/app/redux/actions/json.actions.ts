import { createAction, props } from '@ngrx/store';

export const loadJson = createAction(
  '[JSON] Load JSON',
  props<{ url: string; _type: string }>()
);

export const loadJsonSuccess = createAction(
  '[JSON] Load JSON Success',
  props<{ data: any; _type: string }>()
);

export const loadJsonFailure = createAction(
  '[JSON] Load JSON Failure',
  props<{ error: any }>()
);

export const saveJson = createAction(
  '[JSON] Save JSON',
  props<{ url: string; data: any }>()
);

export const saveJsonSuccess = createAction('[JSON] Save JSON Success');

export const saveJsonFailure = createAction(
  '[JSON] Save JSON Failure',
  props<{ error: any }>()
);

export const rewriteAndSaveJson = createAction(
  '[JSON] Rewrite and Save JSON',
  props<{ url: string; transformFn: (data: any) => any }>()
);

export const rewriteAndSaveJsonSuccess = createAction(
  '[JSON] Rewrite and Save JSON Success'
);

export const rewriteAndSaveJsonFailure = createAction(
  '[JSON] Rewrite and Save JSON Failure',
  props<{ error: any }>()
);
