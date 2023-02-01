import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { clearStartingButtons, startingButtions } from 'src/buttons/starting.buttons';
import { Person } from 'src/entities/Person.entity';
import { Context, session } from 'telegraf';
import { Repository } from 'typeorm';

@Injectable()
export class SurveyService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Person) private readonly personRep: Repository<Person>,
  ) { }

  async startBot(ctx: Context) {
    const incomeUser = ctx.message.from
    const existUser = await this.personRep.findOne({
      where: {
        tgId: incomeUser.id.toString()
      }
    })

    if (!existUser) {
      const newUser = new Person()
      newUser.tgId = incomeUser.id.toString()
      newUser.createdAt = new Date()
      newUser.updatedAt = new Date()
      newUser.personName = incomeUser.first_name
      newUser.tgUsername = incomeUser.username
      newUser.isBot = incomeUser.is_bot
      await this.personRep.save(newUser)
      ctx.reply(`${incomeUser.first_name}, рад приветствовать тебя!`, startingButtions())
    } else {
      ctx.reply(`${incomeUser.first_name}, давно не виделись, рад снова тебя приветствовать!`, startingButtions())
    }

  }

  async echo(text: string): Promise<string> {
    return `Echo: ${text}`;
  }


}


// {
//   id: 179897275,
//   is_bot: false,
//   first_name: 'Анастасия',
//   username: 'skylark88',
//   language_code: 'ru'
// } personNamepersonName