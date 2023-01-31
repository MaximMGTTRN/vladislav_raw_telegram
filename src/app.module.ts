import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MainModule } from './main/main.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { sessionMiddleware } from './middleware/session.middleware';

import * as redisStore from 'cache-manager-redis-store';
import { EchoUpdate } from './echo/echo.update';
import { EchoModule } from './echo/echo.module';
import { GreeterModule } from './greeter/greeter.module';
import { GreeterBotName } from './app.constants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.TYPEORM_HOST,
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      synchronize: false,
      logging: true,
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [__dirname + '/../**/*.entity{.js,.ts}'],
      migrations: ['dist/**/migrations/*.js'],
    }),

    TelegrafModule.forRoot({
      botName: process.env.TG_NAME,
      token: process.env.TOKEN,
      middlewares: [sessionMiddleware],
    }),
    EchoModule,
    GreeterModule,

    // CacheModule.register({
    //   store: redisStore,
    //   host: process.env.REDIS_HOST,
    //   port: parseInt(process.env.REDIS_PORT),
    //   ttl: 3600,
    //   max: 10,
    //   isGlobal: true,
    // }),

    // ScheduleModule.forRoot(),
    // MainModule,
    // SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService, MainModule],
})
export class AppModule { }
