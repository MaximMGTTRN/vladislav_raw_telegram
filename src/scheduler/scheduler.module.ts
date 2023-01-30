import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from 'src/entities/Country.entity';
import { MainModule } from 'src/main/main.module';
import { SchedulerService } from './scheduler.service';

@Module({
  imports: [
    forwardRef(() => MainModule),
    TypeOrmModule.forFeature([]),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
