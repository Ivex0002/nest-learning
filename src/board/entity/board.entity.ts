import { User } from 'src/auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum BoardStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
@Entity()
export class Board extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: BoardStatus;

  // 유저 값을 그대로 주는게 아니라, db에는 실제론 userId 라는 칼럼을 생성함
  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
