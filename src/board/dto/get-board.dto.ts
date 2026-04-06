import { UserResponseDto } from '../../auth/dto/user-res.dto';
import { Board, BoardStatus } from '../entity/board.entity';

export class BoardResponseDto {
  id: number;
  title: string;
  description: string;
  status: BoardStatus;
  user: UserResponseDto;

  constructor(board: Board) {
    const { user, ...rest } = board;
    Object.assign(this, rest);
    this.user = new UserResponseDto(user);
  }
}
