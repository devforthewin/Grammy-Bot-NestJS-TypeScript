import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';
import { BotCommandService } from './bot-command.service';

@Injectable()
export class BotService {
  private bot: Bot;

  constructor(private readonly botCommandService: BotCommandService) {
    //bot initialization
    const token = process.env.BOT_TOKEN;
    if (!token) {
      throw new Error('BOT_TOKEN is not defined');
    }
    this.bot = new Bot(token);
  }

  onModuleInit() {
    this.bot.init();

    this.botCommandService.register(this.bot);

    this.bot.start();
  }
}
