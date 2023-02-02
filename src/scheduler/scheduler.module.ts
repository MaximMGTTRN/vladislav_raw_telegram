import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchedulerService } from './scheduler.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([]),
  ],
  providers: [SchedulerService],
})
export class SchedulerModule {}
