import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  telegramId: number;

  @Column({ nullable: true })
  username?: string;

  @Column()
  firstName: string;

  @Column({ nullable: true })
  lastName?: string;

  @Column({ nullable: true })
  photoUrl?: string;

  @Column({ nullable: true, type: 'text' })
  refreshTokenHash: string | null;
}
