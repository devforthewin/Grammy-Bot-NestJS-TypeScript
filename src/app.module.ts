import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './app/configs/app.config';

@Module({
  imports: [ConfigModule.forRoot(globalConfig), BotModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
