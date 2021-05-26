/**
 * Interface for the 'SurveyData' data
 */
export interface SurveyDataEntity {
  date: string;
  session: string | number;
  generalInformation?: any;
  finalInformation?: any;
  esm?: any;
  screenTime?: any;
  detailedScreenTime?: any;
}
