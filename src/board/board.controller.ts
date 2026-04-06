import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
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
import { GetUser } from '../auth/get-user.deco';
import { UserResponseDto } from '../auth/dto/user-res.dto';
import { BoardResponseDto } from './dto/get-board.dto';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  private logger = new Logger('BoardController');
  constructor(private boardService: BoardService) {}

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardService.getAllBoards();
  }

  @Get('/myboard')
  getAllUserBoards(@GetUser() user: UserResponseDto): Promise<Board[]> {
    return this.boardService.getAllUserBoards(user);
  }

  @Get('/:id')
  // 체킹용 커스텀 파이프
  @UsePipes(ClgCheckPipe)
  async getBoardById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BoardResponseDto> {
    const found = await this.boardService.getBoardById(id);
    this.logger.log(found);
    return found;
  }

  /**
   * - transform: true
   *    - plain object → DTO 인스턴스 변환
   */
  @Post('/')
  createBoard(
    @Body(new ValidationPipe({ transform: true })) newBoardReq: CreateBoardDto,
    @GetUser() user: UserResponseDto,
  ): Promise<Board> {
    this.logger.verbose(
      `user [ ${user.userName} ] create board payload : [ ${JSON.stringify(newBoardReq)} ]`,
    );
    return this.boardService.createBoard(newBoardReq, user);
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
  deleteBoardById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserResponseDto,
  ): Promise<string> {
    this.logger.verbose(
      `user [ ${user.userName} ] del board with id [ ${id} ]`,
    );
    return this.boardService.deleteBoardById(id, user);
  }
}
