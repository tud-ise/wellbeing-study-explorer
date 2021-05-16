import { createReducer, on, Action } from '@ngrx/store';
import * as ConfigActions from './config.actions';

export const CONFIG_FEATURE_KEY = 'config';

export interface State {
  darkMode?: boolean;
}

export interface ConfigPartialState {
  readonly [CONFIG_FEATURE_KEY]: State;
}

export const initialState: State = {
  darkMode: false,
};

const configReducer = createReducer(
  initialState,
  on(ConfigActions.toggleDarkMode, (state) => ({
    ...state,
    darkMode: !state.darkMode,
  }))
);

export function reducer(state: State | undefined, action: Action) {
  return configReducer(state, action);
}
