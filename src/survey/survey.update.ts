import { UseFilters, UseInterceptors } from '@nestjs/common';
import { Update, Hears, Ctx } from 'nestjs-telegraf';
import { SCENES } from 'src/consts/scenes.const';
import { BUTTONS_TEXT } from 'src/consts/dictionary.const';
import { Context } from '../interfaces/context.interface';
import { ResponseTimeInterceptor } from '../common/interceptors/response-time.interceptor';
import { TelegrafExceptionFilter } from '../common/filters/telegraf-exception.filter';
import { SurveyService } from './survey.service';


const { SURVEY_SCENE } = SCENES;
const { START_SURVEY } = BUTTONS_TEXT;

@Update()
@UseInterceptors(ResponseTimeInterceptor)
@UseFilters(TelegrafExceptionFilter)
export class SurveyUpdate {
  constructor(
    private readonly surveyService: SurveyService,
  ) { }

  @Hears([START_SURVEY])
  async startSurvey(@Ctx() ctx: Context) {
    await ctx.scene.enter(SURVEY_SCENE);
  }
}
