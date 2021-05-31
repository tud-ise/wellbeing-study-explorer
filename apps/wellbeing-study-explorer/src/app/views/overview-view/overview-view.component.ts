import { AfterViewInit, Component, OnInit } from '@angular/core';
import { SurveyDataFacade } from '@wellbeing-study-explorer/survey';
import { map } from 'rxjs/operators';
import { getAverage } from '@wellbeing-study-explorer/util';
import { Router } from '@angular/router';
import { ConfigFacade } from '../../+state/config.facade';
import { Observable } from 'rxjs';
import { connectCharts } from '@wellbeing-study-explorer/ui';

@Component({
  selector: 'wellbeing-study-explorer-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: ['./overview-view.component.css'],
})
export class OverviewViewComponent implements OnInit, AfterViewInit {
  viewMode: 'Chart' | 'Grid' = 'Grid';

  allData$: Observable<{
    gridData: any[];
    averages: any;
  }> = this.surveyDataFacade.allSurveyData$.pipe(
    map((data) => {
      if (data) {
        const esmAggregates = [
          {
            name: 'PANAS (positiv)',
            prefix: 'panas_pa',
            func: 'avg',
            description: 'Skala von 1-5',
          },
          {
            name: 'PANAS (negativ)',
            prefix: 'panas_na',
            func: 'avg',
            description: 'Skala von 1-5',
          },
          {
            name: 'Technostress (negativ)',
            prefix: 'technostress_negative',
            func: 'avg',
            description: 'Skala von 1-7',
          },
          {
            name: 'Technostress (positiv)',
            prefix: 'technostress_positive',
            func: 'avg',
            description: 'Skala von 1-7',
          },
        ];
        const allSessions = [
          ...new Set(data.map((item) => item.session.toString())),
        ];
        const gridData = [];
        for (const session of allSessions) {
          const dataOfSession = data.filter(
            (item) => item.session.toString() === session.toString()
          );
          const sessionDisplayData = [];
          for (const aggregate of esmAggregates) {
            sessionDisplayData.push({
              name: aggregate.name,
              value: getAverage(
                dataOfSession.map((item) => item.esm),
                aggregate.prefix,
                aggregate.func
              ),
              description: aggregate.description,
              class: 'esm-color',
            });
          }

          const stAggregates = [
            {
              name: 'Bildschirmzeit',
              prefix: 'time',
              func: 'sum',
              base: 60,
              description: 'Zeit in Minuten',
            },
            {
              name: 'Anzahl Anwendungen',
              prefix: 'numberofapplications',
              func: 'sum',
              base: 1,
              description: 'Anzahl verschiedener Anwendungen',
            },
          ];
          for (const aggregate of stAggregates) {
            sessionDisplayData.push({
              name: aggregate.name,
              value:
                getAverage(
                  dataOfSession.map((item) => item.screenTime),
                  aggregate.prefix,
                  aggregate.func
                ) / aggregate.base,
              description: aggregate.description,
              class: 'st-color',
            });
          }

          const prod_index = data
            .filter((item) => item.session.toString() === session.toString())
            .map((item) => item.screenTime.productivity_index);
          const sum = prod_index.reduce((a, b) => a + b, 0);
          sessionDisplayData.push({
            name: 'Produktivitäts-Index',
            value: sum / prod_index.length || 0,
            description: 'Wert zwischen -2 und +2',
            class: 'st-color',
          });
          gridData.push({ session, data: sessionDisplayData });
        }

        // averages
        if (gridData.length > 0) {
          const allData = gridData.map((item) => item.data);
          const averages = {};
          for (const key of Object.keys(allData[0])) {
            averages[allData[0][key].name] =
              allData
                .map((item) => item[key].value)
                .reduce((a, b) => a + b, 0) / allData.length;
          }
          return { gridData, averages };
        } else {
          return undefined;
        }
      }
    })
  );

  constructor(
    private surveyDataFacade: SurveyDataFacade,
    private router: Router,
    public configFacade: ConfigFacade
  ) {}

  ngOnInit() {
    this.configFacade.changeView('Teilnehmerübersicht');
  }

  ngAfterViewInit() {
    this.linkCharts();
  }

  linkCharts() {
    setTimeout(() => {
      connectCharts([
        'chartEsm',
        'chartStTime',
        'chartStNumber',
        'chartStProd',
      ]);
    });
  }

  openSession(session: string) {
    this.surveyDataFacade.setCurrentSession(session);
    this.router.navigate(['/session']);
  }

  chartData(
    gridData: any[],
    fields: string[]
  ): {
    series: any[];
    xAxis?: string[];
  } {
    if (gridData) {
      const data = gridData.map((item) => item.data);
      const xAxis = gridData.map((item) => item.session);
      const series = [];
      for (const key of Object.keys(data[0])) {
        if (fields.includes(data[0][key]['name'])) {
          const serie = {
            data: data.map((item) => item[key]).map((item) => item.value),
            name: data[0][key]['name'],
            type: 'bar',
          };
          series.push(serie);
        }
      }
      return { series, xAxis };
    }
  }
}
