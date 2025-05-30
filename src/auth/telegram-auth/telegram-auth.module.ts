import { Module } from '@nestjs/common';
import { TelegramAuthService } from './telegram-auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { TelegramAuthController } from './telegram-auth.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      secret: process.env.JWT_SECRET!,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [TelegramAuthService],
  controllers: [TelegramAuthController],
})
export class TelegramAuthModule {}
