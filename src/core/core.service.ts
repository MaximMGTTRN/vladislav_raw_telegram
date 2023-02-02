import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cache } from 'cache-manager';
import { startingButtions } from 'src/buttons/keyboard.buttons';
import { STARTING_REPLIES } from 'src/consts/dictionary.const';
import { Person } from 'src/entities/Person.entity';
import { Context } from 'telegraf';
import { Repository } from 'typeorm';


const { GREET_NEW_USER, GREET_OLD_USER } = STARTING_REPLIES;

@Injectable()
export class CoreService {
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(Person) private readonly personRep: Repository<Person>,
  ) { }

  async startBot(ctx: Context) {
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
      newUser.tgUsername = incomeUser.username;
      newUser.isBot = incomeUser.is_bot;
      await this.personRep.save(newUser);
      ctx.reply(GREET_NEW_USER(incomeUser.first_name), startingButtions());
    } else {
      ctx.reply(GREET_OLD_USER(incomeUser.first_name), startingButtions());
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
