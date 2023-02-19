import { UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import {
  Help,
  InjectBot,
  Start,
  Update,
  Command,
  Hears,
  On,
  Ctx,
} from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { BUTTONS_TEXT } from 'src/consts/dictionary.const';
import { GreeterBotName } from '../app.constants';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { AdminGuard } from '../common/guards/admin.guard';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { linksInlineButtons } from '../buttons/inlineKeyoard.buttons';
import { SCENES } from '../consts/scenes.const';
import { CoreService } from './core.service';


const { SURVEY_SCENE, ADMIN_SCENE } = SCENES;
const { START_SURVEY, SHOW_LINKS } = BUTTONS_TEXT;
@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class CoreUpdate {
  constructor(
    @InjectBot(GreeterBotName)
    private readonly bot: Telegraf<Context>,
    private readonly coreService: CoreService,
  ) { }

  @Start()
  async onStart(ctx: Context): Promise<void> {
    console.log(ctx.from.id);

    await this.coreService.startBot(ctx);
  }

  @Help()
  onHelp(ctx: Context): void {
    this.coreService.replyHelpText(ctx);
  }

  // ########### SCENES START ########### 5768670123, 5482557370

  @Command('admin')
  @UseGuards(AdminGuard)
  async onAdminCommand(ctx: Context): Promise<void> {
    await ctx.scene.enter(ADMIN_SCENE);
  }

  @Hears([START_SURVEY])
  async startSurvey(ctx: Context) {
    await ctx.scene.enter(SURVEY_SCENE);
  }

  // ########### SCENES END ###########

  @Hears(SHOW_LINKS)
  getLinks(ctx: Context) {
    this.coreService.sendLinksOnWesites(ctx);
  }

  @On(['location', 'photo', 'sticker', 'text', 'venue', 'video', 'video_note', 'voice'])
  onRandomText(ctx: Context) {
    this.coreService.replyOnRandomText(ctx);
  }
}
