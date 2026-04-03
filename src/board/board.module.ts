import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';

@Module({
  // 엔티티 등록
  imports: [TypeOrmModule.forFeature([Board])],
  // 컨트롤러
  controllers: [BoardController],
  // 서비스, 저장소
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
