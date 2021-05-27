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
  public className = 'light-theme';

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
        this.className = 'light-theme';
      }
    })
  );

  constructor(private dialog: MatDialog, public configFacade: ConfigFacade) {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      this.configFacade.toggleDarkMode();
    }
  }

  openSettings() {
    this.dialog.open(ConfigDialogComponent, {
      width: '50vw',
      maxWidth: '600px',
    });
  }
}
