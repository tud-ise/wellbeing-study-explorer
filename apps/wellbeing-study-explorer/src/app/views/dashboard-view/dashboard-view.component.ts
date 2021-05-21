import { Component, OnInit } from '@angular/core';
import { ConfigFacade } from '../../+state/config.facade';

@Component({
  selector: 'wellbeing-study-explorer-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit {
  constructor(private configFacade: ConfigFacade) {}

  ngOnInit() {
    this.configFacade.changeView('');
  }
}
