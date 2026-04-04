import { Injectable } from '@nestjs/common';
// board.model 에서 board.entity 으로 변경
// 해당 서비스에서는 board.entity만으로 구현하는 것이 간편
import { Board } from './entity/board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { UserResponseDto } from 'src/auth/dto/user-res.dto';

// TODO
// 단일 데이터베이스, 다중 서비스 상황에 대응하기 위해
// 커스텀 레파지토리로 분리 후 각 메서드들 정의하기
@Injectable()
export class BoardService {
  constructor(
    // 커스텀 레포를 사용하지 않고 직접 서비스에서 구현할때
    // @InjectRepository(Board)
    // private boardRepository: Repository<Board>,

    // 커스텀 레포 주입
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoards(user: UserResponseDto): Promise<Board[]> {
    return await this.boardRepository.getAllBoards(user);
  }

  async getBoardById(id: number): Promise<Board> {
    return await this.boardRepository.getBoardById(id);
  }

  /**
   * create, save 를 모두 쓰는 이유
   * - CreateBoardDto와 Board 엔티티는 정확히 일치하진 않음
   * - 타입의 정규화 및 변환 작업을 위해 create를 사용
   * - save 메서드를 통해 최종적으로 db에 저장
   */
  async createBoard(
    newBoardReq: CreateBoardDto,
    user: UserResponseDto,
  ): Promise<Board> {
    return await this.boardRepository.createBoard(newBoardReq, user);
  }

  /**
   * 보드 업데이트 로직
   *
   * 각 속성값 빈 문자열일때 에러 반환(BoardValidate)
   *
   * 바디에 없는 속성일시 검증 스킵(Partial, {skipMissingProperties: true,})
   *
   * 기입된 속성들이 유효한 값일때만 머징 후 반환
   */
  async updateBoardById(
    id: number,
    updateBoardPayload: UpdateBoardDto,
  ): Promise<Board> {
    return await this.boardRepository.updateBoardById(id, updateBoardPayload);
  }

  async deleteBoardById(id: number): Promise<string> {
    return await this.boardRepository.deleteBoardById(id);
  }
}
