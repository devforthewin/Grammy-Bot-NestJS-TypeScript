import { Injectable } from '@nestjs/common';
import { Bot } from 'grammy';
import { BotCommandService } from './bot-command.service';
import { botConfig } from '../../app/configs/env.config';

@Injectable()
export class BotService {
  private bot: Bot;

  constructor(private readonly botCommandService: BotCommandService) {
    //bot initialization
    const token = botConfig.botToken;
    this.bot = new Bot(token);
  }

  onModuleInit() {
    this.bot.init();
    this.botCommandService.register(this.bot);
    this.bot.start();
  }
}
