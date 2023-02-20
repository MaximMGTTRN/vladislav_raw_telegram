import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import {
  Scene,
  SceneEnter,
  Command,
  On,
  Message,
  Ctx,
  Hears,
} from 'nestjs-telegraf';
import {
  clearButtons,
  startingButtions,
  surveyFinalButtons,
  surveyStageButtons,
  surveyStartButtons,
} from 'src/buttons/keyboard.buttons';

import { BUTTONS_TEXT, SURVEY_SCENE_REPLIES } from 'src/consts/dictionary.const';
import { SCENES } from 'src/consts/scenes.const';
import { Person } from 'src/entities/Person.entity';
import { Survey } from 'src/entities/Surveys.entity';
import { SurveyAnswersEnum } from 'src/enums/surveyAnswersEnum';
import { IUserSurveyAction } from 'src/interfaces/userSurveyAction.interface';
import { Repository } from 'typeorm';
import { linksInlineButtons } from '../../buttons/inlineKeyoard.buttons';
import { ADMINS_IDS } from '../../consts/adminsIds.const';
import { Context } from '../../interfaces/context.interface';

// import { linksInlineButtons } from '../buttons/inlineKeyoard.buttons';


const { SURVEY_SCENE } = SCENES;

const {
  CONTINUE_SURVEY,
  RELOAD_SURVEY,
  LEVAE_SURVEY,
  FINISH_SURVEY,
  FINISH_RELOAD_SURVEY,
} = BUTTONS_TEXT;

const {
  START_NEW_SURVEY_REPLY,
  DO_YOU_LIKE_CONTINUE_SURVEY_REPLY,
  SEE_YOU_LATER,
  FINISH_SURVEY_REPLY,
  SURVEY_PROBLEM_REPLY,
  STAGE_1_REPLY,
  STAGE_2_REPLY,
  STAGE_2_WARNING_REPLY,
  STAGE_3_REPLY,
  STAGE_4_REPLY,
  STAGE_5_REPLY,
  STAGE_6_REPLY,
  CONTINUE_CHECK_REPLY,
  STAGE_2_CONTINUE_REPLY,
  STAGE_3_CONTINUE_REPLY,
  STAGE_4_CONTINUE_REPLY,
  STAGE_5_CONTINUE_REPLY,
  STAGE_6_CONTINUE_REPLY,
  STAGE_7_CONTINUE_REPLY,
} = SURVEY_SCENE_REPLIES;

@Scene(SURVEY_SCENE)
export class SurveyCreateScene {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Person) private readonly personRep: Repository<Person>,
    @InjectRepository(Survey) private readonly surveyRep: Repository<Survey>,
  ) { }

  @SceneEnter()
  async startSurvey(ctx: Context) {
    try {
      const userTgId = ctx.message.from.id.toString();
      const cachedUser: IUserSurveyAction = await this.cacheManager.get(userTgId);

      if (!cachedUser) {
        const userSurveyAction: IUserSurveyAction = {
          surveyStage: 1,
          currentSurvey: new Survey(),
        };

        await this.cacheManager.set(userTgId, userSurveyAction);
        await ctx.reply(START_NEW_SURVEY_REPLY, surveyStageButtons());
        return;
      }

      if (cachedUser.surveyStage === 1) {
        await ctx.reply(START_NEW_SURVEY_REPLY, surveyStageButtons());
        return;
      }

      if (cachedUser && cachedUser.surveyStage !== 1) {
        await ctx.reply(DO_YOU_LIKE_CONTINUE_SURVEY_REPLY, surveyStartButtons());
      }
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @Hears(CONTINUE_SURVEY)
  async continue(ctx: Context) {
    try {
      await this.inputSurveyData(ctx);
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @Hears([RELOAD_SURVEY, FINISH_RELOAD_SURVEY])
  async reload(ctx: Context) {
    try {
      const userTgId = ctx.message.from.id.toString();
      await this.cacheManager.del(userTgId);
      await this.startSurvey(ctx);
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @Hears(LEVAE_SURVEY)
  async leaveSurvey(ctx: Context) {
    try {
      await ctx.reply(SEE_YOU_LATER, startingButtions());
      await ctx.scene.leave();
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @Hears(FINISH_SURVEY)
  async finishSurvey(ctx: Context) {
    try {
      await this.saveSurvey(ctx);
      await ctx.reply(FINISH_SURVEY_REPLY, startingButtions());
      await ctx.reply('Найти меня можно тут:', linksInlineButtons());
      await ctx.scene.leave();
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @On('text')
  async inputSurveyData(
    @Ctx() ctx: Context,
    @Message('text') messageText?: string,
  ): Promise<void> {
    try {
      const userTgId = ctx.message.from.id.toString();
      const cachedUser: IUserSurveyAction = await this.cacheManager.get(userTgId);

      if (!cachedUser) {
        await ctx.reply(SURVEY_PROBLEM_REPLY, clearButtons());
        await ctx.scene.leave();
        await this.startSurvey(ctx);
        return;
      }

      const { surveyStage, currentSurvey } = cachedUser;

      if (surveyStage !== 1 && !messageText) {
        await this.continueSurvey(ctx, cachedUser);
        return;
      }

      switch (surveyStage) {
        case 1: {
          currentSurvey.realName = messageText.toString();
          cachedUser.surveyStage = 2;
          await this.cacheManager.set(userTgId, cachedUser);
          await ctx.reply(STAGE_1_REPLY(messageText), surveyStageButtons());
          return;
        }

        case 2: {
          if (!Number(messageText) || (Number(messageText) < 0 || Number(messageText) > 99)) {
            ctx.reply(STAGE_2_WARNING_REPLY);
            return;
          }

          currentSurvey.age = Number(messageText);
          cachedUser.surveyStage = 3;
          await this.cacheManager.set(userTgId, cachedUser);
          await ctx.reply(STAGE_2_REPLY, surveyStageButtons());
          return;
        }

        case 3: {
          currentSurvey.livingPlace = messageText.toString();
          cachedUser.surveyStage = 4;
          await this.cacheManager.set(userTgId, cachedUser);
          await ctx.reply(STAGE_3_REPLY, surveyStageButtons());
          return;
        }

        case 4: {
          currentSurvey.prefer = messageText.toString();
          cachedUser.surveyStage = 5;
          await this.cacheManager.set(userTgId, cachedUser);
          await ctx.reply(STAGE_4_REPLY, surveyStageButtons());
          return;
        }

        case 5: {
          currentSurvey.webLink = messageText.toString();
          cachedUser.surveyStage = 6;
          await this.cacheManager.set(userTgId, cachedUser);
          await ctx.reply(STAGE_5_REPLY, surveyStageButtons());
          return;
        }

        case 6: {
          currentSurvey.comment = messageText.toString();

          if (!ctx.message.from.username) {
            cachedUser.surveyStage = 666;
            await ctx.reply('Вижу у тебя нет тега "@" телеграмма по которому я смогу с тобой связаться.\nМожешь сейчас написать как я смогу написать тебе в случае чего');
            await this.cacheManager.set(userTgId, cachedUser);
            return;
          }

          currentSurvey.tgUsernameForConnect = ctx.message.from.username;
          cachedUser.surveyStage = 7;
          await this.cacheManager.set(userTgId, cachedUser);
          await ctx.reply(STAGE_6_REPLY);
          await this.finalResult(userTgId, ctx);

          return;
        }

        case 666: {
          currentSurvey.tgUsernameForConnect = `РУЧНОЙВВОД ${messageText.toString()}`;
          cachedUser.surveyStage = 7;
          await this.cacheManager.set(userTgId, cachedUser);
          await this.finalResult(userTgId, ctx);
          return;
        }

        case 7: {
          await this.finalResult(ctx.message.from.id.toString(), ctx);
        }
      }
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  private async continueSurvey(ctx: Context, cachedUser: IUserSurveyAction) {
    try {
      const { surveyStage, currentSurvey } = cachedUser;
      await ctx.reply(CONTINUE_CHECK_REPLY(currentSurvey.realName), surveyStageButtons());

      if (surveyStage === 1) {
        await this.startSurvey(ctx);
        return;
      }

      if (surveyStage === 7) {
        const userTgId = ctx.message.from.id.toString();
        await ctx.reply(STAGE_7_CONTINUE_REPLY);
        await this.finalResult(userTgId, ctx);
        return;
      }

      const surveyAnswers = Object.entries(cachedUser.currentSurvey);

      await ctx.replyWithHTML(
        `<b>Вот что я помню о тебе:</b>\n${surveyAnswers.map((answer) => {
          const answerKey = answer[0];
          return `${SurveyAnswersEnum[answerKey]}: ` + `<i>${answer[1]}</i> \n`;
        }).join('')}`,
      );

      switch (surveyStage) {
        case 2: {
          await ctx.reply(STAGE_2_CONTINUE_REPLY, surveyStageButtons());
          return;
        }

        case 3: {
          await ctx.reply(STAGE_3_CONTINUE_REPLY, surveyStageButtons());
          return;
        }

        case 4: {
          await ctx.reply(STAGE_4_CONTINUE_REPLY, surveyStageButtons());
          return;
        }

        case 5: {
          await ctx.reply(STAGE_5_CONTINUE_REPLY, surveyStageButtons());
          return;
        }

        case 6: {
          await ctx.reply(STAGE_6_CONTINUE_REPLY, surveyStageButtons());
          return;
        }

        case 666: {
          await ctx.reply('Бот не увидел твоего телеграм тега "@". Напиши пожалуйста как стобой связаться', surveyStageButtons());
        }
      }
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  private async finalResult(userTgId: string, ctx: Context) {
    try {
      const cachedUser: IUserSurveyAction = await this.cacheManager.get(userTgId);
      const surveyAnswers = Object.entries(cachedUser.currentSurvey);

      ctx.replyWithHTML(
        `<b>Вот что у нас получлось:</b>\n${surveyAnswers.map((answer) => {
          const answerKey = answer[0];
          return `${SurveyAnswersEnum[answerKey]}: ` + `<i>${answer[1]}</i> \n`;
        }).join('')}`,
        surveyFinalButtons(),
      );
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  private async saveSurvey(ctx: Context) {
    try {
      const userTgId = ctx.message.from.id.toString();
      const cachedUser: IUserSurveyAction = await this.cacheManager.get(userTgId);

      if (!cachedUser) {
        await ctx.reply(SURVEY_PROBLEM_REPLY, clearButtons());
        await ctx.scene.leave();
        await this.startSurvey(ctx);
        return;
      }

      const user = await this.personRep.findOne({
        where: {
          tgId: userTgId,
        },
      });

      if (!user) {
        const incomeUser = ctx.message.from;
        const newUser = new Person();
        newUser.tgId = incomeUser.id.toString();
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        newUser.personName = incomeUser.first_name;
        newUser.tgUsername = incomeUser.username;
        newUser.isBot = incomeUser.is_bot;
        await this.personRep.save(newUser);
      }

      const { currentSurvey } = cachedUser;
      currentSurvey.person = user;
      currentSurvey.createdAt = new Date();
      const savedSurvey = await this.surveyRep.save(currentSurvey);

      if (!savedSurvey) {
        await ctx.reply(SURVEY_PROBLEM_REPLY, clearButtons());
        await ctx.scene.leave();
        await this.startSurvey(ctx);
        return;
      }

      const surveyAnswers = Object.entries(cachedUser.currentSurvey);

      await ctx.telegram.sendMessage(ADMINS_IDS.VLAD_ID,
        `Кто-то заполнил анкету:\n${surveyAnswers.map((answer) => {
          const answerKey = answer[0];

          if (answerKey !== 'person') {
            return `${SurveyAnswersEnum[answerKey]}: ` + `${answer[1]}\n`;
          }
        }).join('')}`);

      await this.cacheManager.del(userTgId);
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @On(['location', 'photo', 'sticker', 'venue', 'video', 'video_note', 'voice'])
  async onRandomText(ctx: Context) {
    try {
      await ctx.reply('Во время заполнения анкеты бот понимает только текст\nПожалуйста не отправляй стикеры, фото, видео итд\n\nЕсли хочешь продолжить заполнене - ответь на крайний вопрос бота\n\nЕсли хочешь выйти из заполнения- нажми на кнопку в меню', surveyStageButtons());
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    try {
      await ctx.scene.leave();
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }
}

