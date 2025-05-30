import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';
import { AuthResponseDto } from './telegram-auth/dto/auth-response.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateTokens(
    userId: number,
    telegramId: number,
  ): Promise<AuthResponseDto> {
    const payload = { sub: userId, telegramId };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }

  hashData(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }
}
