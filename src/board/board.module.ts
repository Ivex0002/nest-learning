import { Module } from '@nestjs/common';
import { BoardController } from './board.controller';
import { BoardService } from './board.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './entity/board.entity';
import { BoardRepository } from './board.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  // 엔티티 등록
  imports: [TypeOrmModule.forFeature([Board]), AuthModule],
  // 컨트롤러
  controllers: [BoardController],
  // 서비스, 저장소
  providers: [BoardService, BoardRepository],
})
export class BoardModule {}
