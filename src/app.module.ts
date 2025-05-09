import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './app/configs/global.config';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [ConfigModule.forRoot(globalConfig), BotModule, TodoModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
