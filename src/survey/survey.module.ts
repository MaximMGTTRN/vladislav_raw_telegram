import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/Person.entity';
import { Survey } from 'src/entities/Surveys.entity';
import { SurveyService } from './survey.service';
import { SurveyUpdate } from './survey.update';
import { SurveyCreateScene } from './scenes/surveyCreate.scene';


@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Survey]),
  ],
  providers: [
    SurveyUpdate,
    SurveyService,
    SurveyCreateScene,
  ],
})
export class SurveyModule { }
