import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  // 가져오기
  imports: [],
  // 내보내기
  exports: [],
  // 엔드포인트
  controllers: [AppController],
  // 실제 로직
  providers: [AppService],
})
export class AppModule {}

// 추상화 모듈(=코어모듈)
// 엔드포인트 없는 기반 로직(providers) 익스포팅 전용 모듈
// 실제 각 controller에 알맞은 로직 구현은 해당 모듈을 받아와 진행
// 클래스 상속 개념이랑 비슷한 듯
