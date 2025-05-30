import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { TelegramUserPayload } from '../telegram-auth/telegram-user.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async findByTelegramId(telegramId: number): Promise<User | null> {
    return this.userRepo.findOne({ where: { telegramId } });
  }

  async createFromTelegram(payload: TelegramUserPayload): Promise<User> {
    const user = this.userRepo.create({
      telegramId: payload.id,
      firstName: payload.first_name,
      lastName: payload.last_name,
      username: payload.username,
      photoUrl: payload.photo_url,
    });
    return this.userRepo.save(user);
  }

  async updateRefreshTokenHash(userId: number, hash: string | null) {
    await this.userRepo.update(userId, { refreshTokenHash: hash });
  }
}
