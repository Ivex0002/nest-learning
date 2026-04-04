import { User } from '../entities/user.entity';

export class UserResponseDto {
  id: number;
  userName: string;

  constructor(user: User) {
    this.id = user.id;
    this.userName = user.userName;
  }
}
