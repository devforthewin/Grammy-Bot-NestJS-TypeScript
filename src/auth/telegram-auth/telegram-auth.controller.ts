import { Body, Controller, Post } from '@nestjs/common';
import { AuthResponseDto } from './dto/auth-response.dto';
import { TelegramAuthService } from './telegram-auth.service';

@Controller('auth/telegram')
export class TelegramAuthController {
  constructor(private readonly authService: TelegramAuthService) {}

  @Post()
  async authenticate(
    @Body('initData') initData: string,
  ): Promise<AuthResponseDto> {
    return this.authService.authenticateWithTelegram(initData);
  }
}
