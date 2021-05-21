import { createReducer, on, Action } from '@ngrx/store';
import * as ConfigActions from './config.actions';

export const CONFIG_FEATURE_KEY = 'config';

export interface State {
  darkMode?: boolean;
  view?: string;
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: State;
}

export const initialState: State = {
  darkMode: false,
  view: '',
};

const configReducer = createReducer(
  initialState,
  on(ConfigActions.toggleDarkMode, (state) => ({
    ...state,
    darkMode: !state.darkMode,
  })),
  on(ConfigActions.changeView, (state, { view }) => ({
    ...state,
    view,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
