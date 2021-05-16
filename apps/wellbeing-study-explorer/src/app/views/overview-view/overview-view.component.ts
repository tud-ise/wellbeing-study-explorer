import { Component } from '@angular/core';
import { SurveyDataFacade } from '@wellbeing-study-explorer/survey';
import { map } from 'rxjs/operators';
import { getAverage } from '@wellbeing-study-explorer/util';
import { Router } from '@angular/router';

@Component({
  selector: 'wellbeing-study-explorer-overview-view',
  templateUrl: './overview-view.component.html',
  styleUrls: ['./overview-view.component.css'],
})
export class OverviewViewComponent {
  sessions$ = this.surveyDataFacade.allSurveyData$.pipe(
    map((data) => {
      if (data) {
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
        const allSessions = [
          ...new Set(data.map((item) => item.session.toString())),
        ];
        const mappedData = [];
        for (const session of allSessions) {
          const dataOfSession = data.filter(
            (item) => item.session.toString() === session.toString()
          );
          const sessionDisplayData = [];
          for (const aggregate of aggregates) {
            sessionDisplayData.push({
              name: aggregate.name,
              value: getAverage(
                dataOfSession.map((item) => item.esm),
                aggregate.prefix,
                aggregate.func
              ),
            });
          }
          sessionDisplayData.push({
            name: 'Bildschirmzeit',
            value: getAverage(
              data
                .filter(
                  (item) => item.session.toString() === session.toString()
                )
                .map((item) => item.screenTime),
              undefined,
              'avg'
            ),
          });
          const prod_index = data
            .filter((item) => item.session.toString() === session.toString())
            .map((item) => item.screenTime.productivity_index);
          const sum = prod_index.reduce((a, b) => a + b, 0);
          sessionDisplayData.push({
            name: 'Produktivitäts-Index',
            value: sum / prod_index.length || 0,
          });
          mappedData.push({ session, data: sessionDisplayData });
        }
        return mappedData;
      }
    })
  );

  averages$ = this.sessions$.pipe(
    map((items) => {
      if (items && items.length > 0) {
        const allData = items.map((item) => item.data);
        const obj = {};
        for (const key of Object.keys(allData[0])) {
          obj[allData[0][key].name] =
            allData.map((item) => item[key].value).reduce((a, b) => a + b, 0) /
            allData.length;
        }
        return obj;
      } else {
        return undefined;
      }
    })
  );

  constructor(
    private surveyDataFacade: SurveyDataFacade,
    private router: Router
  ) {}

  openSession(session: string) {
    this.surveyDataFacade.setCurrentSession(session);
    this.router.navigate(['/session']);
  }
}
