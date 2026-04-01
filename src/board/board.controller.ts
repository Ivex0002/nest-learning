import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { Board } from './board.model';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('/')
  getAllBoards(): Board[] {
    return this.boardService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseUUIDPipe) id: string): Board {
    return this.boardService.getBoardById(id);
  }

  /**
   * ValidationPipe({ transform: true }) 적용
   * - 요청 body → DTO 변환 + 유효성 검증 (실패 시 400)
   */
  @Post('/')
  createBoard(
    @Body(new ValidationPipe({ transform: true })) newBoardReq: CreateBoardDto,
  ): Board {
    return this.boardService.createBoard(newBoardReq);
  }

  @Patch('/:id')
  updateBoardById(
    @Param('id', ParseUUIDPipe) id: string,
    @Body(
      new ValidationPipe({
        transform: true,
        skipMissingProperties: true,
      }),
    )
    board: UpdateBoardDto,
  ): Board {
    return this.boardService.updateBoardById(id, board);
  }

  @Delete('/:id')
  deleteBoardById(@Param('id', ParseUUIDPipe) id: string): void {
    return this.boardService.deleteBoardById(id);
  }
}
