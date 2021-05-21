import { createAction, props } from '@ngrx/store';

export const toggleDarkMode = createAction('[Config] Toggle DarkMode');
export const changeView = createAction(
  '[Config] Change View',
  props<{ view: string }>()
);
