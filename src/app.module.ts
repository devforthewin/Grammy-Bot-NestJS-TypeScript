import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './app/configs/global.config';
import { TodoModule } from './todo/todo.module';
import { TelegramAuthModule } from './ telegram-auth/telegram-auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormAsyncConfig } from './app/configs/app.typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    TypeOrmModule.forRootAsync(typeormAsyncConfig),
    BotModule,
    TodoModule,
    TelegramAuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
