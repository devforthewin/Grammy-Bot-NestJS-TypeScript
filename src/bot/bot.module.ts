import { Module } from '@nestjs/common';
import { BotService } from './services/bot.service';
import { BotCommandService } from './services/bot-command.service';

@Module({
  providers: [BotService, BotCommandService],
})
export class BotModule {}
