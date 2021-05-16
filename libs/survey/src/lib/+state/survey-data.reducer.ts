import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as SurveyDataActions from './survey-data.actions';
import { SurveyDataEntity } from './survey-data.models';

export const SURVEYDATA_FEATURE_KEY = 'surveyData';

export interface State extends EntityState<SurveyDataEntity> {
  loaded: boolean; // has the SurveyData list been loaded
  error?: string | null; // last known error (if any)
  session?: string;
  date?: string;
}

export interface SurveyDataPartialState {
  readonly [SURVEYDATA_FEATURE_KEY]: State;
}

export const surveyDataAdapter: EntityAdapter<SurveyDataEntity> = createEntityAdapter<SurveyDataEntity>(
  {
    selectId: (item) => item.date + '/' + item.session,
    sortComparer: (a, b) => {
      if (a.session === b.session) {
        return a.date.localeCompare(b.date);
      } else {
        return a.session.toString().localeCompare(b.session.toString());
      }
    },
  }
);

export const initialState: State = surveyDataAdapter.getInitialState({
  loaded: false,
});

const surveyDataReducer = createReducer(
  initialState,
  on(SurveyDataActions.init, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    SurveyDataActions.loadSurveyDataSuccess,
    (state, { surveyData, replace }) => {
      if (replace) {
        localStorage.setItem('survey_data', JSON.stringify(surveyData));
      } else {
        const currentItems: SurveyDataEntity[] = JSON.parse(
          localStorage.getItem('survey_data')
        );
        localStorage.setItem(
          'survey_data',
          JSON.stringify(currentItems.concat(surveyData))
        );
      }
      let session = state.session;
      let date = state.date;
      if (surveyData && surveyData.length > 0) {
        if (!session && surveyData) {
          session = surveyData[0].session.toString();
        }
        if (!date && surveyData) {
          date = surveyData[0].date.toString();
        }
      }
      const newState = {
        ...state,
        loaded: true,
        session,
        date,
      };
      return replace
        ? surveyDataAdapter.setAll(surveyData, newState)
        : surveyDataAdapter.upsertMany(surveyData, newState);
    }
  ),
  on(SurveyDataActions.loadSurveyDataFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(SurveyDataActions.setCurrentDate, (state, { date }) => ({
    ...state,
    date,
  })),
  on(SurveyDataActions.setCurrentSession, (state, { session }) => ({
    ...state,
    session,
  })),
  on(SurveyDataActions.reset, (state) => {
    localStorage.removeItem('survey_data');
    return surveyDataAdapter.removeAll({
      ...state,
      session: undefined,
      date: undefined,
    });
  })
);

export function reducer(state: State | undefined, action: Action) {
  return surveyDataReducer(state, action);
}
