import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ConfigFacade } from '../../+state/config.facade';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SurveyDataFacade } from '@wellbeing-study-explorer/survey';
import { Router } from '@angular/router';

@Component({
  selector: 'wellbeing-study-explorer-config-dialog',
  templateUrl: './config-dialog.component.html',
  styleUrls: ['./config-dialog.component.scss'],
})
export class ConfigDialogComponent {
  formGroup: FormGroup;

  constructor(
    private configFacade: ConfigFacade,
    private formBuilder: FormBuilder,
    private surveyFacade: SurveyDataFacade,
    private router: Router,
    public dialogRef: MatDialogRef<ConfigDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = formBuilder.group({});
  }

  save() {
    this.dialogRef.close();
  }

  loadSampleData() {
    this.surveyFacade.loadSampleData();
    this.router.navigate(['/']);
    this.dialogRef.close();
  }

  deleteData() {
    this.surveyFacade.reset();
    this.router.navigate(['/']);
    this.dialogRef.close();
  }
}
