import { Module } from '@nestjs/common';
import { BoardModule } from './board/board.module';
import { MymoduleModule } from './mymodule/mymodule.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMConfig } from './configs/typeorm.config';

@Module({
  // 가져오기
  imports: [TypeOrmModule.forRoot(typeORMConfig), BoardModule, MymoduleModule],
  // 내보내기
  exports: [],
  // 엔드포인트
  controllers: [],
  // 실제 로직
  providers: [],
})
export class AppModule {}

// 추상화 모듈(=코어모듈)
// 엔드포인트 없는 기반 로직(providers) 익스포팅 전용 모듈
// 실제 각 controller에 알맞은 로직 구현은 해당 모듈을 받아와 진행
// 클래스 상속 개념이랑 비슷한 듯
