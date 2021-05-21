import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CONFIG_FEATURE_KEY,
  State,
  ConfigPartialState,
} from './config.reducer';

export const getConfigState = createFeatureSelector<ConfigPartialState, State>(
  CONFIG_FEATURE_KEY
);

export const getDarkMode = createSelector(
  getConfigState,
  (state: State) => state.darkMode
);

export const view = createSelector(
  getConfigState,
  (state: State) => state.view
);
