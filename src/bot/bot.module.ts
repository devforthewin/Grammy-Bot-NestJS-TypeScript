import { Module } from '@nestjs/common';
import { BotService } from './services/bot.service';
import { BotCommandService } from './services/bot-command.service';
import { TodoService } from '../todo/todo.service';

@Module({
  providers: [BotService, BotCommandService, TodoService],
  imports: [],
})
export class BotModule {}
