import { CacheModule, forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { TelegrafModule } from 'nestjs-telegraf';
import * as redisStore from 'cache-manager-redis-store';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { sessionMiddleware } from './middleware/session.middleware';
import { CoreModule } from './core/core.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dbtgvlad',
      port: parseInt(process.env.TYPEORM_PORT),
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DB,
      synchronize: false,
      logging: true,
      migrationsTableName: 'migrations',
      namingStrategy: new SnakeNamingStrategy(),
      entities: [`${__dirname}/../**/*.entity{.js,.ts}`],
      migrations: ['dist/**/migrations/*.js'],
    }),
    CacheModule.register({
      store: redisStore,
      host: 'redistgvlad',
      port: parseInt(process.env.REDIS_PORT),
      ttl: 3600,
      isGlobal: true,
    }),
    TelegrafModule.forRoot({
      botName: process.env.TG_NAME,
      token: process.env.TOKEN,
      middlewares: [sessionMiddleware],
    }),
    CoreModule,

    // SchedulerModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
