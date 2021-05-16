import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import * as SurveyDataActions from './survey-data.actions';
import * as SurveyDataSelectors from './survey-data.selectors';
import { Observable } from 'rxjs';
import { SurveyDataEntity } from './survey-data.models';
import { map } from 'rxjs/operators';

@Injectable()
export class SurveyDataFacade {
  loaded$ = this.store.pipe(select(SurveyDataSelectors.getSurveyDataLoaded));
  allSurveyData$ = this.store.pipe(
    select(SurveyDataSelectors.getAllSurveyData)
  );
  currentDate$ = this.store.pipe(select(SurveyDataSelectors.getCurrentDate));
  currentSession$ = this.store.pipe(
    select(SurveyDataSelectors.getCurrentSession)
  );
  currentItem$ = this.store.pipe(select(SurveyDataSelectors.getCurrentItem));
  currentItemsForSession$ = this.store.pipe(
    select(SurveyDataSelectors.getCurrentItemsForSession)
  );
  allDatesForSession$ = this.store
    .pipe(select(SurveyDataSelectors.getByCurrentSession))
    .pipe(map((items) => items.map((item) => item.date)));

  allDates$: Observable<string[]> = this.allSurveyData$.pipe(
    map((data) => {
      if (data) {
        const dates = data.map((item) => item.date);
        return [...new Set(dates)];
      } else {
        return [];
      }
    }),
    map((items) =>
      items.sort((a, b) => a.toString().localeCompare(b.toString()))
    )
  );

  allSessions$: Observable<string[]> = this.allSurveyData$.pipe(
    map((data) => {
      if (data) {
        const sessions = data.map((item) => item.session.toString());
        return [...new Set(sessions)];
      } else {
        return [];
      }
    }),
    map((items) =>
      items.sort((a, b) => a.toString().localeCompare(b.toString()))
    )
  );

  sessionData$ = (field: keyof SurveyDataEntity): Observable<any[]> =>
    this.currentItemsForSession$.pipe(
      map((items) => {
        const newItems = [];
        for (const item of items) {
          newItems.push({ date: item.date, ...item[field] });
        }
        return newItems;
      })
    );

  constructor(private store: Store) {
    this.init();
  }

  init() {
    this.store.dispatch(SurveyDataActions.init());
  }

  setCurrentSession(session: string) {
    this.store.dispatch(SurveyDataActions.setCurrentSession({ session }));
  }

  setCurrentDate(date: string) {
    this.store.dispatch(SurveyDataActions.setCurrentDate({ date }));
  }

  addSurveyData(surveyData: SurveyDataEntity[], replace: boolean = true) {
    this.store.dispatch(
      SurveyDataActions.loadSurveyDataSuccess({ surveyData, replace })
    );
  }

  reset() {
    this.store.dispatch(SurveyDataActions.reset());
  }

  loadSampleData() {
    this.store.dispatch(SurveyDataActions.loadSampleData());
  }
}
