import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SurveyDataFacade,
  SurveyDataEntity,
} from '@wellbeing-study-explorer/survey';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map, tap } from 'rxjs/operators';
import { ConfigFacade } from '../../+state/config.facade';

@Component({
  selector: 'wellbeing-study-explorer-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.css'],
})
export class DailyViewComponent implements OnInit {
  public data$: Observable<SurveyDataEntity> = this.surveyDataFacade
    .currentItem$;

  public sessions$: Observable<string[]> = this.surveyDataFacade.allSessions$;

  public datesForSession$ = this.surveyDataFacade.allDatesForSession$.pipe(
    tap((items) => (this.possibleDates = items))
  );

  private possibleDates: string[];

  constructor(
    private route: ActivatedRoute,
    public surveyDataFacade: SurveyDataFacade,
    public configFacade: ConfigFacade
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['date']) {
        this.surveyDataFacade.setCurrentDate(params['date']);
      }
      if (params['session']) {
        this.surveyDataFacade.setCurrentSession(params['session']);
      }
    });
  }

  public chartData$ = (
    field: keyof SurveyDataEntity
  ): Observable<{ series: any[]; xAxis?: string[] }> =>
    this.data$.pipe(
      map((data) => {
        if (data) {
          const xAxis = Object.keys(data[field]).filter(
            (item) => item.indexOf('number') === -1
          );
          const parsedData = [];
          for (const key of xAxis) {
            parsedData.push(data[field][key]);
          }
          return { series: [{ data: parsedData, type: 'bar' }], xAxis };
        }
      })
    );

  dateFilter = (date: Date) => {
    if (this.possibleDates) {
      return this.possibleDates.includes(moment(date).format('YYYY-MM-DD'));
    }
    return true;
  };

  setDate(value: Date) {
    this.surveyDataFacade.setCurrentDate(moment(value).format('YYYY-MM-DD'));
  }

  getKeys(currentItem: SurveyDataEntity) {
    return Object.keys(currentItem.generalInformation);
  }
}
