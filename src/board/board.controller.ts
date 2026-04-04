import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './entity/board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { ClgCheckPipe } from './pipe/clg-check.pipe';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get('/:id')
  // 체킹용 커스텀 파이프
  @UsePipes(ClgCheckPipe)
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardService.getBoardById(id);
  }

  /**
   * - transform: true
   *    - plain object → DTO 인스턴스 변환
   */
  @Post('/')
  createBoard(
    @Body(new ValidationPipe({ transform: true })) newBoardReq: CreateBoardDto,
  ): Promise<Board> {
    return this.boardService.createBoard(newBoardReq);
  }

  /**
   * 강의에서는 @UsePipes(ValidationPipe)를 사용하여 메서드 전체를 검증함
   *
   * createBoard 는 메서드 수준 검증과 파라미터 수준 검증 두가지 방식 모두 가능하나
   *
   * updateBoardById는 각 파라미터별 검증 방식(uuid, board)이 달라 이와 같은 방법이 적절함
   *
   * - skipMissingProperties: true
   *    - 바디 내부에 없는 키값은 검증 스킵
   */
  @Patch('/:id')
  updateBoardById(
    @Param('id', ParseIntPipe) id: number,
    @Body(
      new ValidationPipe({
        transform: true,
        skipMissingProperties: true,
      }),
    )
    board: UpdateBoardDto,
  ): Promise<Board> {
    return this.boardService.updateBoardById(id, board);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.boardService.deleteBoardById(id);
  }
}
