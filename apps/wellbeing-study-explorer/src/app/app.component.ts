import { ChangeDetectionStrategy, Component, HostBinding } from '@angular/core';
import { ConfigFacade } from './+state/config.facade';
import { tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfigDialogComponent } from './dialog/config-dialog/config-dialog.component';

@Component({
  selector: 'wellbeing-study-explorer-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  @HostBinding('class')
  public className = '';

  public currentView: string;

  public menuItems: { name: string; link: string; iconClass?: string }[] = [
    { name: 'Übersicht', link: '/overview', iconClass: 'fa fa-th' },
    { name: 'Teilnehmeransicht', link: '/session', iconClass: 'fa fa-user' },
    { name: 'Detailansicht', link: '/daily', iconClass: 'fa fa-calendar-day' },
  ];

  public title = 'wellbeing-study-explorer';
  public darkMode$ = this.configFacade.darkMode$.pipe(
    tap((darkMode) => {
      if (darkMode) {
        this.className = 'dark-theme';
      } else {
        this.className = '';
      }
    })
  );

  constructor(private dialog: MatDialog, public configFacade: ConfigFacade) {}

  openSettings() {
    this.dialog.open(ConfigDialogComponent, {
      width: '50vw',
      maxWidth: '600px',
    });
  }
}
