/**
 * Interface for the 'SurveyData' data
 */
export interface SurveyDataEntity {
  date: string;
  session: string | number;
  generalInformation?: any;
  esm?: any;
  screenTime?: any;
}
