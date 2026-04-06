import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';

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
  // Board 타입으로 응답이 갈때는 select: false 설정으로 제외된
  // password 외 모든 유저 속성이 전달됨
  @ManyToOne(() => User, (user) => user.boards, { eager: false })
  user: User;
}
