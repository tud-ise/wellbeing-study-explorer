import { createAction, props } from '@ngrx/store';
import { SurveyDataEntity } from './survey-data.models';

export const init = createAction('[SurveyData] Init');

export const loadSurveyDataSuccess = createAction(
  '[SurveyData] Load SurveyData Success',
  props<{ surveyData: SurveyDataEntity[]; replace: boolean }>()
);

export const loadSurveyDataFailure = createAction(
  '[SurveyData] Load SurveyData Failure',
  props<{ error: any }>()
);

export const setCurrentSession = createAction(
  '[SurveyData] Set Current Session',
  props<{ session: string }>()
);

export const setCurrentDate = createAction(
  '[SurveyData] Set Current Date',
  props<{ date: string }>()
);

export const reset = createAction('[SurveyData] Reset');

export const loadSampleData = createAction('[SurveyData] Load Sample Data');
