import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as ConfigActions from './config.actions';
import * as ConfigSelectors from './config.selectors';

@Injectable()
export class ConfigFacade {
  darkMode$ = this.store.pipe(select(ConfigSelectors.getDarkMode));

  constructor(private store: Store) {}

  toggleDarkMode() {
    this.store.dispatch(ConfigActions.toggleDarkMode());
  }
}
