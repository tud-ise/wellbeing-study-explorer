import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromSurveyData from './+state/survey-data.reducer';
import { EffectsModule } from '@ngrx/effects';
import { SurveyDataEffects } from './+state/survey-data.effects';
import { SurveyDataFacade } from './+state/survey-data.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromSurveyData.SURVEYDATA_FEATURE_KEY,
      fromSurveyData.reducer
    ),
    EffectsModule.forFeature([SurveyDataEffects]),
  ],
  providers: [SurveyDataFacade],
})
export class SurveyModule {}
