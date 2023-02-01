import { Module } from '@nestjs/common';
import { SurveyUpdate } from './survey.update';
import { SurveyService } from './survey.service';
import { RandomNumberScene } from '../greeter/scenes/random-number.scene';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/Person.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Person]),
  ],
  providers: [
    SurveyUpdate,
    SurveyService,
    RandomNumberScene
  ],
})
export class SurveyModule { }
