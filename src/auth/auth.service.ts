import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { JwtService } from '@nestjs/jwt';
import { AuthResponseDto } from './dto/auth-res.dto';
import { UserResponseDto } from './dto/user-res.dto';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<UserResponseDto> {
    return await this.userRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<AuthResponseDto> {
    // 유저 실존 및 비번 검증은 db
    const user = await this.userRepository.signIn(authCredentialsDto);
    const payload = { id: user.id };
    const accessToken = this.jwtService.sign(payload);

    // 비밀번호 노출 방지용으로 User 타입으로 온 객체를 UserResponseDto으로 파싱 후 전달
    const res: AuthResponseDto = {
      user: new UserResponseDto(user),
      accessToken: accessToken,
    };

    return res;
  }
}
