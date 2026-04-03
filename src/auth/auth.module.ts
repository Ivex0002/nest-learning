import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Module({
  // 강의에서는 forFeature에 레파지토리를 직접 입력했으나, 이는 TypeORM 0.2 이하 에서 사용되던 방법임
  // 최신 커스텀 레포 방식에 알맞게 엔티티만 임포팅하고 레파지토리는 providers에 등록하는 방법을 사용함
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserRepository],
})
export class AuthModule {}
