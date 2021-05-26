import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import * as fromConfig from './+state/config.reducer';
import { ConfigFacade } from './+state/config.facade';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DATE_LOCALE,
  MatNativeDateModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MomentModule } from 'ngx-moment';
import { ConfigDialogComponent } from './dialog/config-dialog/config-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DailyViewComponent } from './views/daily-view/daily-view.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { SessionViewComponent } from './views/session-view/session-view.component';
import { OverviewViewComponent } from './views/overview-view/overview-view.component';
import { FileUploadViewComponent } from './views/file-upload-view/file-upload-view.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatCardModule } from '@angular/material/card';
import { UiModule } from '@wellbeing-study-explorer/ui';
import { SurveyModule } from '@wellbeing-study-explorer/survey';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ServiceWorkerModule } from '@angular/service-worker';
import { DashboardViewComponent } from './views/dashboard-view/dashboard-view.component';
import { UtilModule } from '@wellbeing-study-explorer/util';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard',
      },
      {
        path: 'dashboard',
        component: DashboardViewComponent,
      },
      {
        path: 'daily',
        children: [
          { path: '', component: DailyViewComponent },
          { path: ':date', component: DailyViewComponent },
          { path: ':date/:session', component: DailyViewComponent },
        ],
      },
      {
        path: 'session',
        children: [
          { path: '', component: SessionViewComponent },
          { path: ':session', component: SessionViewComponent },
        ],
      },
      {
        path: 'overview',
        children: [{ path: '', component: OverviewViewComponent }],
      },
      {
        path: 'file-upload',
        children: [{ path: '', component: FileUploadViewComponent }],
      },
    ]),
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    StoreModule.forFeature(fromConfig.CONFIG_FEATURE_KEY, fromConfig.reducer),
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatSelectModule,
    MomentModule,
    MatDialogModule,
    FormsModule,
    MatMenuModule,
    MatSidenavModule,
    MatListModule,
    MatTooltipModule,
    NgxDropzoneModule,
    MatCardModule,
    UiModule,
    UtilModule,
    SurveyModule,
    MatRippleModule,
    MatCheckboxModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    MatButtonToggleModule,
  ],
  providers: [ConfigFacade, { provide: MAT_DATE_LOCALE, useValue: 'de-DE' }],
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    ConfigDialogComponent,
    DailyViewComponent,
    SessionViewComponent,
    OverviewViewComponent,
    FileUploadViewComponent,
    DashboardViewComponent,
  ],
})
export class AppModule {}
