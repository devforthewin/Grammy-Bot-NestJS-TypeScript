import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { TelegramAuthModule } from './telegram-auth/telegram-auth.module';
import { JwtStrategy } from './jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [UserModule, TelegramAuthModule],
  providers: [JwtStrategy, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
