import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  SurveyDataFacade,
  SurveyDataEntity,
} from '@wellbeing-study-explorer/survey';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { map, tap } from 'rxjs/operators';
import { ConfigFacade } from '../../+state/config.facade';
import { connectCharts } from '@wellbeing-study-explorer/ui';

@Component({
  selector: 'wellbeing-study-explorer-daily-view',
  templateUrl: './daily-view.component.html',
  styleUrls: ['./daily-view.component.css'],
})
export class DailyViewComponent implements OnInit, AfterViewInit {
  public currentItem$: Observable<SurveyDataEntity> = this.surveyDataFacade
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
    this.configFacade.changeView('Detailansicht');
    this.route.params.subscribe((params) => {
      if (params['date']) {
        this.surveyDataFacade.setCurrentDate(params['date']);
      }
      if (params['session']) {
        this.surveyDataFacade.setCurrentSession(params['session']);
      }
    });
  }

  ngAfterViewInit() {
    this.linkCharts();
  }

  linkCharts() {
    setTimeout(() => {
      connectCharts(['chartTime', 'chartNumber']);
    });
  }

  public chartData$ = (
    field: keyof SurveyDataEntity,
    prefix?: string
  ): Observable<{ series: any[]; xAxis?: string[] }> =>
    this.currentItem$.pipe(
      map((data) => {
        if (data && data[field]) {
          let xAxis = Object.keys(data[field]);
          if (prefix) {
            xAxis = xAxis.filter((item) => item.indexOf(prefix) > -1);
          }
          const parsedData = [];
          for (const key of xAxis) {
            parsedData.push(data[field][key]);
          }
          if (prefix) {
            for (let i = 0; i < xAxis.length; i++) {
              xAxis[i] = xAxis[i].replace(prefix, '');
            }
          }
          return parsedData.length > 0
            ? { series: [{ data: parsedData, type: 'bar' }], xAxis }
            : undefined;
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
}
