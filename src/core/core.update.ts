import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  InjectBot,
  Start,
  Update,
  Command,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { GreeterBotName } from '../app.constants';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { CoreService } from './core.service';


@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class CoreUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly startingService: CoreService,
  ) { }

  @Start()
  async onStart(ctx: Context): Promise<void> {
    await this.startingService.startBot(ctx);
  }

  @Help()
  async onHelp(): Promise<string> {
    return 'Send me any text';
  }

  @Command('admin')
  @UseGuards(AdminGuard)
  onAdminCommand(): string {
    return 'Welcome judge';
  }
}
