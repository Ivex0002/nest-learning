// import { EntityRepository, Repository } from "typeorm";

import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './entity/board.entity';
import { CreateBoardDto, UpdateBoardDto } from './dto/create-board.dto';
import { UserResponseDto } from 'src/auth/dto/user-res.dto';

// @EntityRepository
// export class BoardRepository extends Repository {

// }
// typeorm 0.2 이하 버전에서 사용되던 방법.
// 강의 영상보다 시일이 지나 사용법이 변경됨
// 커스텀 레포 생성이 아니라 서비스 측에서 직접 사용

// 단일 레포 + 다중 서비스 상황을 대응하기 위해 기존에 서비스에서 구현 되던 로직들을 커스텀 레포지토리로 변경함
@Injectable()
export class BoardRepository extends Repository<Board> {
  constructor(private dataSource: DataSource) {
    super(Board, dataSource.createEntityManager());
  }

  async getAllBoards(user: UserResponseDto): Promise<Board[]> {
    // 강의에서 쓴 쿼리 빌더 예시를 현 프로젝트에 맞게 수정한 버전
    // const query = this.createQueryBuilder('board');
    // const result = await query
    //   .leftJoinAndSelect('board.user', 'user')
    //   .where('user.id = :userId', { userId: user.id })
    //   .getMany();
    // const boards = result.map((el) => new BoardResponseDto(el));
    // console.log(boards);

    return await this.find({
      where: { user: { id: user.id } },
      relations: ['user'],
    });
  }

  async getBoardById(id: number): Promise<Board> {
    const found = await this.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Board with ID [ ${id} ] not found`);
    }
    return found;
  }

  async createBoard(
    newBoardReq: CreateBoardDto,
    user: UserResponseDto,
  ): Promise<Board> {
    const board = this.create({ ...newBoardReq.board, user: user });
    return await this.save(board);
  }

  async updateBoardById(
    id: number,
    updateBoardPayload: UpdateBoardDto,
  ): Promise<Board> {
    const board = await this.getBoardById(id);
    Object.assign(board, updateBoardPayload.board);
    return await this.save(board);
  }

  async deleteBoardById(id: number): Promise<string> {
    const result = await this.delete(id);
    console.log({ result });
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID [ ${id} ] not found`);
    }
    return `Board with ID [ ${id} ] is deleted`;
  }

  /**
   * dataSource를 활용한 보드 생성 예시
   *
   * queryRunner ≈ git commit
   *
   * 뭔가 하나라도 잘못되면 롤백
   */
  async createBoardWithLog(newBoardReq: CreateBoardDto): Promise<Board> {
    const queryRunner = this.dataSource.createQueryRunner(); // dataSource에서 쿼리러너 생성

    await queryRunner.connect();
    await queryRunner.startTransaction(); // 트랜잭션 시작

    try {
      const { board: boardPayload } = newBoardReq;
      const board = this.create(boardPayload);

      // 1. 게시글 저장
      const savedBoard = await queryRunner.manager.save(board);

      // 2. (가상의 로직) 로그 테이블에 기록
      // 만약 여기서 에러가 나면 게시글 저장도 취소됨
      await queryRunner.manager.query(
        `INSERT INTO action_log (message) VALUES ('Board created: ${savedBoard.id}')`,
      );

      await queryRunner.commitTransaction(); // 모두 성공 시 확정
      return savedBoard;
    } catch (err) {
      await queryRunner.rollbackTransaction(); // 하나라도 실패 시 되돌림
      throw err;
    } finally {
      await queryRunner.release(); // 연결 해제
    }
  }
}
