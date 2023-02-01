import { Module } from '@nestjs/common';
import { CoreUpdate } from './core.update';
import { CoreService } from './core.service';
import { RandomNumberScene } from '../greeter/scenes/random-number.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/Person.entity';
import { SurveyUpdate } from 'src/survey/survey.update';
import { SurveyModule } from 'src/survey/survey.module';
import { SurveyService } from 'src/survey/survey.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
    SurveyModule,
  ],
  providers: [
    CoreUpdate,
    CoreService,
    RandomNumberScene,
    SurveyUpdate,
    SurveyService,
  ],
})
export class CoreModule { }
