import { Component, OnInit } from '@angular/core';
import { ConfigFacade } from '../../+state/config.facade';
import {SurveyDataFacade} from '@wellbeing-study-explorer/survey';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'wellbeing-study-explorer-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {

  public hasData$: Observable<boolean> = this.surveyDataFacade.allSurveyData$
    .pipe(map(items => items && items.length > 0))

  constructor(
    private configFacade: ConfigFacade,
    private surveyDataFacade: SurveyDataFacade
  ) {}

  ngOnInit() {
    this.configFacade.changeView('');
  }
}
