import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TelegramAuthService } from '../telegram-auth.service';
import { FastifyRequest } from 'fastify';

@Injectable()
export class TelegramAuthGuard implements CanActivate {
  constructor(private readonly authService: TelegramAuthService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const initData = request.headers['x-telegram-initdata'] as string;

    if (!initData) {
      throw new UnauthorizedException('Missing initData');
    }

    try {
      const user = this.authService.validateInitData(initData);
      request.user = user;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid Telegram initData');
    }
  }
}
