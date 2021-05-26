import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SurveyDataEntity } from '@wellbeing-study-explorer/survey';
import { SurveyDataFacade } from '@wellbeing-study-explorer/survey';
import {
  getProperties,
  parseArrayToObjects,
  parseCSV,
  removeProperties,
} from '@wellbeing-study-explorer/util';
import { ConfigFacade } from '../../+state/config.facade';

@Component({
  selector: 'wellbeing-study-explorer-file-upload-view',
  templateUrl: './file-upload-view.component.html',
  styleUrls: ['./file-upload-view.component.css'],
})
export class FileUploadViewComponent implements OnInit {
  public files: File[] = [];
  public message: string;

  public replace = true;

  constructor(
    private surveyDataFacade: SurveyDataFacade,
    private cdr: ChangeDetectorRef,
    private configFacade: ConfigFacade
  ) {}

  ngOnInit() {
    this.configFacade.changeView('Daten laden');
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload() {
    const reader = new FileReader();
    reader.onload = () => {
      const fileContent = reader.result.toString();
      const parsedContent = parseCSV(fileContent);
      const data = parseArrayToObjects(parsedContent);

      // parse array as survey data
      const surveyData = [];
      for (const item of data) {
        const surveyItem: SurveyDataEntity = {
          date: item.date,
          session: item.session,
          esm: getProperties(item, 'esm_'),
          screenTime: removeProperties(getProperties(item, 'st_'), 'detailed'),
          generalInformation: getProperties(item, 'general_'),
          finalInformation: getProperties(item, 'final_'),
          detailedScreenTime: getProperties(item, 'st_detailed'),
        };
        surveyData.push(surveyItem);
      }
      this.surveyDataFacade.addSurveyData(surveyData, this.replace);
      this.files = [];
      this.message =
        'Es wurden erfolgreich ' +
        surveyData.length +
        ' Datensätze eingelesen. ' +
        'Klicken Sie hier um diese zu betrachten.';
      this.cdr.detectChanges();
    };
    reader.readAsText(this.files[0], 'utf-8');
  }
}
