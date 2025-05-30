import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BotModule } from './bot/bot.module';
import { ConfigModule } from '@nestjs/config';
import { globalConfig } from './app/configs/global.config';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeormAsyncConfig } from './app/configs/app.typeorm';
import { UserModule } from './auth/users/user.module';
import { TelegramAuthModule } from './auth/telegram-auth/telegram-auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(globalConfig),
    TypeOrmModule.forRootAsync(typeormAsyncConfig),
    BotModule,
    TodoModule,
    UserModule,
    TelegramAuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
