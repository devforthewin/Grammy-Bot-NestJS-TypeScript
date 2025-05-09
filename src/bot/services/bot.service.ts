import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';

@Injectable()
export class BotService {
  private bot: Bot;

  constructor() {
    //bot initialization
    const token = process.env.BOT_TOKEN;
    if (!token) {
      throw new Error('BOT_TOKEN is not defined');
    }
    this.bot = new Bot(token);
  }

  onModuleInit() {
    this.bot.init();

    this.bot.command('start', (ctx) =>
      ctx.reply('Hello from NestJS + Fastify + Grammy!'),
    );

    this.bot.start();
  }
}
