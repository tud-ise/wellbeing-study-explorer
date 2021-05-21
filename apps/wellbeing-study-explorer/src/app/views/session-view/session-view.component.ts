import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  SurveyDataFacade,
  SurveyDataEntity,
} from '@wellbeing-study-explorer/survey';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ChartSeries,
  ChartType,
  connectCharts,
} from '@wellbeing-study-explorer/ui';
import { aggregateData } from '@wellbeing-study-explorer/util';
import { ConfigFacade } from '../../+state/config.facade';

@Component({
  selector: 'wellbeing-study-explorer-session-view',
  templateUrl: './session-view.component.html',
  styleUrls: ['./session-view.component.css'],
})
export class SessionViewComponent implements OnInit, AfterViewInit {
  public sessions$: Observable<string[]> = this.surveyDataFacade.allSessions$;

  public currentItem$: Observable<SurveyDataEntity> = this.surveyDataFacade
    .currentItem$;

  public esmData$ = this.surveyDataFacade.sessionData$('esm');
  public screenTimeData$ = this.surveyDataFacade.sessionData$('screenTime');

  public chartEsmData$ = this.surveyDataFacade.sessionData$('esm').pipe(
    map((data) => {
      const xAxis = data.map((item) => item.date);
      const aggregates = [
        {
          name: 'PANAS (positiv)',
          prefix: 'panas_pa',
          func: 'avg',
        },
        {
          name: 'PANAS (negativ)',
          prefix: 'panas_na',
          func: 'avg',
        },
        {
          name: 'Technostress (negativ)',
          prefix: 'technostress_negative',
          func: 'avg',
        },
        {
          name: 'Technostress (positiv)',
          prefix: 'technostress_positive',
          func: 'avg',
        },
      ];
      const series = [];
      for (const aggregate of aggregates) {
        series.push({
          name: aggregate.name,
          data: aggregateData(data, aggregate.prefix, aggregate.func).map(
            (item) => item[aggregate.prefix]
          ),
          type: 'line',
        });
      }
      return { series, xAxis };
    })
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public configFacade: ConfigFacade,
    public surveyDataFacade: SurveyDataFacade
  ) {}

  ngOnInit(): void {
    this.configFacade.changeView('Teilnehmeransicht');
    this.route.params.subscribe((params) => {
      if (params['session']) {
        this.surveyDataFacade.setCurrentSession(params['session']);
      }
    });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      connectCharts([
        'chartEsm',
        'chartStTime',
        'chartStNumber',
        'chartStProd',
      ]);
    });
  }

  public chartData$ = (
    field: keyof SurveyDataEntity,
    prefix?: string
  ): Observable<{ series: ChartSeries[]; xAxis: string[] }> =>
    this.surveyDataFacade.sessionData$(field).pipe(
      map((data) => {
        if (data) {
          const xAxis = data.map((item) => item.date);
          const series = [];
          let keys = Object.keys(data[0]).filter((item) => item !== 'date');
          if (prefix) {
            keys = keys.filter((item) => item.indexOf(prefix) > -1);
          }
          for (const key of keys) {
            const serie = {
              data: data.map((item) => item[key]),
              name: prefix ? key.replace(prefix, '') : key,
              type: 'line',
            };
            series.push(serie);
          }
          return { series, xAxis };
        }
      })
    );

  openDailyView(date: string) {
    this.surveyDataFacade.setCurrentDate(date);
    this.router.navigate(['/daily']);
  }
}
