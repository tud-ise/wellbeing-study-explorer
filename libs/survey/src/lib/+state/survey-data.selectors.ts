import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  SURVEYDATA_FEATURE_KEY,
  State,
  SurveyDataPartialState,
  surveyDataAdapter,
} from './survey-data.reducer';

// Lookup the 'SurveyData' feature state managed by NgRx
export const getSurveyDataState = createFeatureSelector<
  SurveyDataPartialState,
  State
>(SURVEYDATA_FEATURE_KEY);

const { selectAll, selectEntities } = surveyDataAdapter.getSelectors();

export const getSurveyDataLoaded = createSelector(
  getSurveyDataState,
  (state: State) => state.loaded
);

export const getSurveyDataError = createSelector(
  getSurveyDataState,
  (state: State) => state.error
);

export const getAllSurveyData = createSelector(
  getSurveyDataState,
  (state: State) => selectAll(state)
);

export const getSurveyDataEntities = createSelector(
  getSurveyDataState,
  (state: State) => selectEntities(state)
);

export const getCurrentSession = createSelector(
  getSurveyDataState,
  (state: State) => state.session
);

export const getCurrentDate = createSelector(
  getSurveyDataState,
  (state: State) => state.date
);

export const getByCurrentSession = createSelector(
  getSurveyDataState,
  (state: State) =>
    selectAll(state).filter(
      (item) => item.session.toString() === state.session.toString()
    )
);

export const getByCurrentDate = createSelector(
  getSurveyDataState,
  (state: State) => selectAll(state).filter((item) => item.date === state.date)
);

export const getCurrentItem = createSelector(
  getSurveyDataState,
  (state: State) =>
    selectAll(state).find(
      (item) =>
        item.date === state.date &&
        item.session.toString() === state.session.toString()
    )
);

export const getCurrentItemsForSession = createSelector(
  getSurveyDataState,
  (state: State) =>
    selectAll(state).filter(
      (item) => item.session.toString() === state.session.toString()
    )
);
