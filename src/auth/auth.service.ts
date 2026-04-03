import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto) {
    return this.userRepository.createUser(authCredentialsDto);
  }
}
