import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as ConfigActions from './config.actions';
import * as ConfigSelectors from './config.selectors';

@Injectable()
export class ConfigFacade {
  darkMode$ = this.store.pipe(select(ConfigSelectors.getDarkMode));
  view$ = this.store.pipe(select(ConfigSelectors.view));

  constructor(private store: Store) {}

  toggleDarkMode() {
    this.store.dispatch(ConfigActions.toggleDarkMode());
  }

  changeView(view: string) {
    this.store.dispatch(ConfigActions.changeView({ view }));
  }
}
