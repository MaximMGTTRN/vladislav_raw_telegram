import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/entities/Person.entity';
import { Survey } from 'src/entities/Surveys.entity';
import { CoreService } from './core.service';
import { CoreUpdate } from './core.update';
import { AdminScene } from './scenes/admin.scene';
import { SurveyCreateScene } from './scenes/surveyCreate.scene';


@Module({
  imports: [
    TypeOrmModule.forFeature([Person, Survey]),
  ],
  providers: [
    CoreUpdate,
    CoreService,
    SurveyCreateScene,
    AdminScene,
  ],
})
export class CoreModule { }
