import { Survey } from 'src/entities/Surveys.entity';


export interface IUserSurveyAction {
  surveyStage: number;
  currentSurvey: Survey;
}
