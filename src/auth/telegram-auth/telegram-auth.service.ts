import { Injectable, UnauthorizedException } from '@nestjs/common';
import { TelegramUserPayload } from './telegram-user.interface';
import * as crypto from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { UserService } from '../users/user.service';
import { AuthService } from '../auth.service';

interface RawTelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
}

@Injectable()
export class TelegramAuthService {
  private readonly botToken = process.env.TELEGRAM_BOT_TOKEN!;

  constructor(
    @InjectRepository(User)
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  private verifyHash(initData: URLSearchParams): void {
    const dataCheckString = [...initData.entries()]
      .filter(([key]) => key !== 'hash')
      .sort()
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    const secretKey = crypto
      .createHash('sha256')
      .update(this.botToken)
      .digest();

    const hmac = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    const providedHash = initData.get('hash');

    if (hmac !== providedHash) {
      throw new UnauthorizedException('Invalid initData hash');
    }
  }

  validateInitData(initData: string): TelegramUserPayload {
    const parsed = new URLSearchParams(initData);

    this.verifyHash(parsed);

    const userRaw = parsed.get('user');
    if (!userRaw) {
      throw new UnauthorizedException('Missing user payload');
    }

    let userField: RawTelegramUser;
    try {
      userField = JSON.parse(userRaw) as RawTelegramUser;
    } catch (e) {
      throw new UnauthorizedException('Invalid user JSON');
    }

    const user: TelegramUserPayload = {
      id: Number(userField.id),
      first_name: userField.first_name,
      last_name: userField.last_name || undefined,
      username: userField.username || undefined,
      photo_url: userField.photo_url || undefined,
      auth_date: Number(parsed.get('auth_date')),
    };

    return user;
  }

  async authenticateWithTelegram(initData: string) {
    const tgUser = this.validateInitData(initData);

    let user = await this.userService.findByTelegramId(tgUser.id);
    if (!user) user = await this.userService.createFromTelegram(tgUser);

    const tokens = await this.authService.generateTokens(
      user.id,
      user.telegramId,
    );
    const refreshTokenHash = this.authService.hashData(tokens.refreshToken);

    await this.userService.updateRefreshTokenHash(user.id, refreshTokenHash);

    return tokens;
  }
}
