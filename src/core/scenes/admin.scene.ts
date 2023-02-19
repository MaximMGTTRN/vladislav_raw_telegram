import * as path from 'path';
import * as fs from 'fs';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import * as moment from 'moment';
import * as XLSX from 'xlsx';
import {
  Scene,
  SceneEnter,
  Command,
  On,
  Hears,
  Action,
  Message,
  Ctx,
} from 'nestjs-telegraf';
import {
  adminButtons,
  startingButtions,
} from 'src/buttons/keyboard.buttons';
import { ADMIN_COMMAND, BUTTONS_TEXT, SURVEY_SCENE_REPLIES } from 'src/consts/dictionary.const';
import { SCENES } from 'src/consts/scenes.const';
import { Person } from 'src/entities/Person.entity';
import { Survey } from 'src/entities/Surveys.entity';
import { Repository } from 'typeorm';
import { Markup, Telegraf } from 'telegraf';
import { Context } from '../../interfaces/context.interface';
import { messaeToAllInlineButtons } from '../../buttons/inlineKeyoard.buttons';


const { EXPORT_FILE_NAME } = ADMIN_COMMAND;
const { ADMIN_SCENE } = SCENES;

const {
  GET_SURVEYS_ADMIN,
  SEND_MESSAGE_ADMIN,
  TO_MAIN_MENU_ADMIN,
} = BUTTONS_TEXT;

const arrUserId = [
  { tgId: 5768670123 },
  { tgId: 5482557370 },
  { tgId: 173071005 },
];

@Scene(ADMIN_SCENE)
export class AdminScene {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,

    // private readonly bot: Telegraf<Context>,
    @InjectRepository(Person) private readonly personRep: Repository<Person>,
    @InjectRepository(Survey) private readonly surveyRep: Repository<Survey>,
  ) { }

  @SceneEnter()
  async startSurvey(ctx: Context) {
    await ctx.reply('Владислав здравствуй, что хочешь сделать?', adminButtons());
  }

  @Command('leave')
  @Hears([TO_MAIN_MENU_ADMIN])
  async onLeaveCommand(ctx: Context): Promise<void> {
    await ctx.reply('Заходи если что...', startingButtions());
    await ctx.scene.leave();
  }

  @Hears([GET_SURVEYS_ADMIN])
  async getAdminMenu(ctx: Context) {
    try {
      const allSurveys = await this.surveyRep
        .createQueryBuilder('survey')
        .leftJoin('survey.person', 'person')
        .select([
          'survey.realName as "Имя"',
          'survey.age as "Возраст"',
          'survey.livingPlace as "Место"',
          'survey.prefer as "Предпочтения"',
          'survey.webLink as "Ссылка"',
          'survey.comment as "Коментарий"',
          'survey.tgUsernameForConnect as "ТгПриЗаполнение"',
          'DATE(TO_CHAR(person.createdAt, \'DD.MM.YYYY\')) as "ПервыйВходВБота"',
        ])
        .getRawMany();

      const dateToday = moment().format('DD-MM-YYYY');
      const fileName = EXPORT_FILE_NAME(dateToday);

      const filePath = path.resolve(
        __dirname, 'excelReports',
      );

      const ws = XLSX.utils.json_to_sheet(allSurveys);
      const wb = XLSX.utils.book_new();
      await XLSX.utils.book_append_sheet(wb, ws);
      await XLSX.writeFile(wb, filePath);
      await ctx.sendDocument({ source: filePath, filename: fileName });
      await fs.promises.unlink(filePath);
      await ctx.reply('Влад, спасибо что пользуешься ботом!)');
    } catch (e) {
      await ctx.reply('Возникла ошибка, напиши @antianti_eva');
    }
  }

  @Hears([SEND_MESSAGE_ADMIN])
  @Action(['writeAgain'])
  async startMessageToAllUser(ctx: Context) {
    try {
      await ctx.reply('Напиши текст сообщеня:');
    } catch (e) {
      await ctx.reply('Возникла ошибка, попробуй написать /start или напиши @antianti_eva');
    }
  }

  @Action(['allIsGood'])
  async sendTextMessageToAll(ctx: Context) {
    try {
      const writedMessage: string = await this.cacheManager.get('message');
      const allUsersId = await this.personRep.find();

      await Promise.allSettled(allUsersId.map(async (currentUser) => {
        await ctx.telegram.sendMessage(currentUser.tgId, writedMessage);
      }));

      await ctx.reply('Все активные юзеры получили сообщение', adminButtons());
    } catch (e) {
      await ctx.reply('Возникла ошибка, попробуй написать /start или напиши @antianti_eva');
    }
  }

  @On(['text'])
  async writeTextMessageToAllUsers(
    @Ctx() ctx: Context,
  ) {
    try {
      console.log(ctx.message);


      await this.cacheManager.set('message', ctx.message);
      await ctx.reply('Перепроверь сообщение и нажми на кнопку', messaeToAllInlineButtons());
    } catch (e) {
      await ctx.reply('Возникла ошибка, попробуй написать /start или напиши @antianti_eva');
    }
  }
}
