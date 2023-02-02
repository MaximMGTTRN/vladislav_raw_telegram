import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/Person.entity';
import { SurveyUpdate } from 'src/survey/survey.update';
import { SurveyModule } from 'src/survey/survey.module';
import { SurveyService } from 'src/survey/survey.service';
import { Survey } from 'src/entities/Surveys.entity';
import { RandomNumberScene } from '../greeter/scenes/random-number.scene';
import { CoreService } from './core.service';
import { CoreUpdate } from './core.update';


@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Survey]),
    SurveyModule,
  ],
  providers: [
    CoreUpdate,
    CoreService,
    SurveyUpdate,
    SurveyService,
  ],
})
export class CoreModule { }
