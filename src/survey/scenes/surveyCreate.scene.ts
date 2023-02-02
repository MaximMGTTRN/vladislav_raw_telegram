import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { Scene, SceneEnter, SceneLeave, Command, On, Message, Ctx, Hears } from 'nestjs-telegraf';
import { clearButtons, startingButtions, surveyFinalButtons, surveyStageButtons, surveyStartButtons } from 'src/buttons/keyboard.buttons';
import { BUTTONS_TEXT, SURVEY_SCENE_REPLIES } from 'src/consts/dictionary.const';
import { SCENES } from 'src/consts/scenes.const';
import { Person } from 'src/entities/Person.entity';
import { Survey } from 'src/entities/Surveys.entity';
import { SurveyAnswersEnum } from 'src/enums/surveyAnswersEnum';
import { IUserSurveyAction } from 'src/interfaces/userSurveyAction.interface';
import { Repository } from 'typeorm';
import { Context } from '../../interfaces/context.interface';


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
  }

  @Hears(CONTINUE_SURVEY)
  async continue(ctx: Context) {
    await this.inputSurveyData(ctx);
  }

  @Hears([RELOAD_SURVEY, FINISH_RELOAD_SURVEY])
  async reload(ctx: Context) {
    const userTgId = ctx.message.from.id.toString();
    await this.cacheManager.del(userTgId);
    await this.startSurvey(ctx);
  }

  @Hears(LEVAE_SURVEY)
  async leaveSurvey(ctx: Context) {
    await ctx.reply(SEE_YOU_LATER, startingButtions());
    await ctx.scene.leave();
  }

  @Hears(FINISH_SURVEY)
  async finishSurvey(ctx: Context) {
    await this.saveSurvey(ctx);
    await ctx.reply(FINISH_SURVEY_REPLY, startingButtions());
    await ctx.scene.leave();
  }

  @On('text')
  async inputSurveyData(
    @Ctx() ctx: Context,
    @Message('text') messageText?: string,
  ): Promise<any> {
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
        if (!Number(messageText)) {
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
        currentSurvey.tgUsernameForConnect = ctx.message.from.username;
        cachedUser.surveyStage = 7;
        await this.cacheManager.set(userTgId, cachedUser);
        await ctx.reply(STAGE_6_REPLY);
        await this.finalResult(userTgId, ctx);
        return;
      }

      case 7: {
        await this.finalResult(ctx.message.from.id.toString(), ctx);
      }
    }
  }

  private async continueSurvey(ctx: Context, cachedUser: IUserSurveyAction) {
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
      `<b>Вот что я помню о тебе:</b>\n${
      surveyAnswers.map((answer) => {
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
      }
    }
  }

  private async finalResult(userTgId: string, ctx: Context) {
    const cachedUser: IUserSurveyAction = await this.cacheManager.get(userTgId);
    const surveyAnswers = Object.entries(cachedUser.currentSurvey);

    ctx.replyWithHTML(
      `<b>Вот что у нас получлось:</b>\n${
      surveyAnswers.map((answer) => {
        const answerKey = answer[0];
        return `${SurveyAnswersEnum[answerKey]}: ` + `<i>${answer[1]}</i> \n`;
      }).join('')}`,
      surveyFinalButtons(),
    );
  }

  private async saveSurvey(ctx: Context) {
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
    const savedSurvey = await this.surveyRep.save(currentSurvey);

    if (!savedSurvey) {
      await ctx.reply(SURVEY_PROBLEM_REPLY, clearButtons());
      await ctx.scene.leave();
      await this.startSurvey(ctx);
      return;
    }

    await this.cacheManager.del(userTgId);
  }

  @Command('leave')
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.scene.leave();
  }
}
