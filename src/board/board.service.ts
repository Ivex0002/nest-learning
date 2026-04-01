import { Injectable, NotFoundException } from '@nestjs/common';
import { Board } from './board.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardService {
  private boards: Board[] = [];

  getAllBoards(): Board[] {
    return this.boards;
  }

  getBoardById(id: string): Board {
    const board = this.boards.find((item) => id === item.id);
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  createBoard(newBoardReq: CreateBoardDto): Board {
    const newBoardWithId: Board = {
      id: uuid(),
      ...newBoardReq.board,
    };

    this.boards.push(newBoardWithId);
    return newBoardWithId;
  }

  /**
   * 보드 업데이트 로직
   * 각 속성값 빈 문자열일때 에러 반환
   * 바디에 없는 속성일시 검증 스킵(Partial, {skipMissingProperties: true,})
   * 기입된 속성들이 유효한 값일때만 머징 후 반환
   */
  updateBoardById(id: string, updatePayload: UpdateBoardDto): Board {
    const board = this.getBoardById(id);
    Object.assign(board, updatePayload.board);
    return board;
  }

  deleteBoardById(id: string): void {
    this.boards = this.boards.filter((item) => item.id !== id);
  }
}
