import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JWTStrategy } from './jwt.strategy';
import config from 'config';

export interface JwtConfig {
  secret: string;
  expiresIn: number;
}

const jwtConfig = config.get<JwtConfig>('jwt');
@Module({
  imports: [
    // 강의에서는 forFeature에 레파지토리를 직접 입력했으나, 이는 TypeORM 0.2 이하 에서 사용되던 방법임
    // 최신 커스텀 레포 방식에 알맞게 엔티티만 임포팅하고 레파지토리는 providers에 등록하는 방법을 사용함
    TypeOrmModule.forFeature([User]),
    // 인증용 jwt 모듈
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret,
      signOptions: {
        expiresIn: Number(process.env.JWT_EXPIRE_IN) || jwtConfig.expiresIn,
      },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JWTStrategy],
  exports: [JWTStrategy, PassportModule],
})
export class AuthModule {}
