import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { TelegrafExecutionContext, TelegrafException } from 'nestjs-telegraf';
import { ADMINS_IDS } from '../../consts/adminsIds.const';
import { Context } from '../../interfaces/context.interface';


@Injectable()
export class AdminGuard implements CanActivate {
  private readonly ADMINSID = Object.values(ADMINS_IDS);

  canActivate(context: ExecutionContext): boolean {
    const ctx = TelegrafExecutionContext.create(context);
    const { from } = ctx.getContext<Context>();

    const isAdmin = this.ADMINSID.includes(from.id);

    if (!isAdmin) {
      throw new TelegrafException('Сюда вам не надо 😡');
    }

    return true;
  }
}
