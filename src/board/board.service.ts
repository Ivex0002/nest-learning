import { Injectable, NotFoundException } from '@nestjs/common';
// board.model 에서 board.entity 으로 변경
// 해당 서비스에서는 board.entity만으로 구현하는 것이 간편
import { Board } from './board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// TODO
// 단일 데이터베이스, 다중 서비스 상황에 대응하기 위해
// 커스텀 레파지토리로 분리 후 각 메서드들 정의하기
@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private boardRepository: Repository<Board>,
  ) {}

  async getAllBoards(): Promise<Board[]> {
    return await this.boardRepository.find();
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.boardRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Board with ID [ ${id} ] not found`);
    }
    return found;
  }

  /**
   * create, save 를 모두 쓰는 이유
   * - CreateBoardDto와 Board 엔티티는 정확히 일치하진 않음
   * - 타입의 정규화 및 변환 작업을 위해 create를 사용
   * - save 메서드를 통해 최종적으로 db에 저장
   */
  async createBoard(newBoardReq: CreateBoardDto): Promise<Board> {
    const board = this.boardRepository.create(newBoardReq.board);

    return await this.boardRepository.save(board);
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
    updatePayload: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.getBoardById(id);
    Object.assign(board, updatePayload.board);
    return await this.boardRepository.save(board);
  }

  async deleteBoardById(id: number): Promise<string> {
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID [ ${id} ] not found`);
    }
    return `Board with ID [ ${id} ] is deleted`;
  }
}
