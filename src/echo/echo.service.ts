import { Injectable } from '@nestjs/common';
import { session } from 'telegraf';

@Injectable()
export class EchoService {
  async echo(text: string): Promise<string> {
    return `Echo: ${text}`;
  }
}
