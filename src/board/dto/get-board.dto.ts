import { UserResponseDto } from '../../auth/dto/user-res.dto';
import { Board } from '../entity/board.entity';

// 보드 레포의 주석처리된 쿼리 빌더용 dto
export class BoardResponseDto {
  id: number;
  title: string;
  user: UserResponseDto;

  constructor(board: Board) {
    this.id = board.id;
    this.title = board.title;
    this.user = new UserResponseDto(board.user);
  }
}
