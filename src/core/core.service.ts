import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { startingButtions } from 'src/buttons/keyboard.buttons';
import { ADMIN_COMMAND, STARTING_REPLIES } from 'src/consts/dictionary.const';
import { Person } from 'src/entities/Person.entity';
import { Context } from 'telegraf';
import { Repository } from 'typeorm';

import { Survey } from '../entities/Surveys.entity';
import { linksInlineButtons } from '../buttons/inlineKeyoard.buttons';
import { ADMINS_IDS } from '../consts/adminsIds.const';


const { GREET_NEW_USER, GREET_OLD_USER } = STARTING_REPLIES;
const { EXPORT_FILE_NAME } = ADMIN_COMMAND;

@Injectable()
export class CoreService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Person) private readonly personRep: Repository<Person>,
    @InjectRepository(Survey) private readonly surveyRep: Repository<Survey>,
  ) { }

  async startBot(ctx: Context) {
    try {
      const incomeUser = ctx.message.from;

      const existUser = await this.personRep.findOne({
        where: {
          tgId: incomeUser.id.toString(),
        },
      });

      if (!existUser) {
        const newUser = new Person();
        newUser.tgId = incomeUser.id.toString();
        newUser.createdAt = new Date();
        newUser.updatedAt = new Date();
        newUser.personName = incomeUser.first_name;
        newUser.tgUsername = incomeUser.username ? incomeUser.username : 'no @ name';
        newUser.isBot = incomeUser.is_bot;
        await this.personRep.save(newUser);
        await ctx.reply(GREET_NEW_USER(incomeUser.first_name), startingButtions());
      } else {
        await ctx.reply(GREET_OLD_USER(incomeUser.first_name), startingButtions());
      }
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот ${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  async sendLinksOnWesites(ctx: Context): Promise<void> {
    try {
      await ctx.replyWithHTML('<b>Можешь найти меня тут:</b>', linksInlineButtons());
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот ${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  async replyHelpText(ctx: Context): Promise<void> {
    try {
      await ctx.reply('Бота сделал MGTTRN\nПо всем вопросам\n\n➡️@antianti_eva⬅️\n\nВ случае ошибок тоже сюда(:');
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот ${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }

  async replyOnRandomText(ctx: Context): Promise<void> {
    try {
      await ctx.reply('Бот тебя не понимает...\n\nПопробуй нажать на клавиши в меню.\n\nЕсли что-то не работает или ты видишь это собщение снова попробуй написать /start');
    } catch (e) {
      await ctx.telegram.sendMessage(ADMINS_IDS.MAKS_ID, `У кого то баганул бот ${ctx.from.id}`);
      await ctx.reply('Увы что то пошло не так, попробуй нажать на копки в меню или написать /start');
    }
  }
}


// {
//   id: 179897275,
//   is_bot: false,
//   first_name: 'Анастасия',
//   username: 'skylark88',
//   language_code: 'ru'
// } personNamepersonName
