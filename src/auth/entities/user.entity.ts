import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Board } from '../../board/entity/board.entity';

@Entity()
@Unique(['userName'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Board, (board) => board.user, { eager: false })
  boards: Board[];

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    // 패스워드 수정이 아니면 스킵
    if (!this.password) return;
    // 이미 해시된 경우 스킵
    if (this.password.startsWith('$2')) return;

    this.password = await bcrypt.hash(this.password, 10);
  }

  async validatePassword(rawPassword: string): Promise<boolean> {
    return await bcrypt.compare(rawPassword, this.password);
  }
}
