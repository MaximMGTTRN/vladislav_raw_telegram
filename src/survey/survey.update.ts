import { ExecutionContext, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  InjectBot,
  On,
  Message,
  Start,
  Update,
  Command,
  TelegrafExecutionContext,
  Hears,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { SurveyService } from './survey.service';
import { GreeterBotName } from '../app.constants';
import { Context } from '../interfaces/context.interface';
import { ReverseTextPipe } from '../common/pipes/reverse-text.pipe';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { fromBuffer } from 'telegraf/typings/input';

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class SurveyUpdate {
  constructor(
    private readonly surveyService: SurveyService,
  ) { }

  // @Start()
  // async onStart(ctx: Context): Promise<void> {
  //   await this.surveyService.startBot(ctx)
  // }

  // @Help()
  // async onHelp(): Promise<string> {
  //   return 'Send me any text';
  // }

  // @Command('admin')
  // @UseGuards(AdminGuard)
  // onAdminCommand(): string {
  //   return 'Welcome judge';
  // }

  @Hears(['startSurvey'])
  startSurvey() {
    return 'aaaaaa'
  }

  // @On('text')
  // onMessage(
  //   @Message('text', new ReverseTextPipe()) reversedText: string,
  // ): any {
  //   return this.surveyService.echo(reversedText);
  // }
}
