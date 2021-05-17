import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import * as SurveyDataActions from './survey-data.actions';
import { sampleData } from '../data/sample-data';

@Injectable()
export class SurveyDataEffects {
  init$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyDataActions.init),
      fetch({
        run: () => {
          const surveyData = JSON.parse(localStorage.getItem('survey_data'));
          if (surveyData) {
            return SurveyDataActions.loadSurveyDataSuccess({
              surveyData,
              replace: true,
            });
          } else {
            return SurveyDataActions.loadSurveyDataSuccess({
              surveyData: [],
              replace: true,
            });
          }
        },
        onError: (action, error) => {
          return SurveyDataActions.loadSurveyDataFailure({ error });
        },
      })
    )
  );

  loadSampleData = createEffect(() =>
    this.actions$.pipe(
      ofType(SurveyDataActions.loadSampleData),
      fetch({
        run: () =>
          SurveyDataActions.loadSurveyDataSuccess({
            surveyData: sampleData.map((item) => ({
              ...item,
              session: 'Participant-' + item.session,
            })),
            replace: true,
          }),
      })
    )
  );

  constructor(private actions$: Actions) {}
}
