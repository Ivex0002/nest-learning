import { Injectable } from '@nestjs/common';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UserRepository } from './user.repository';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private userRepository: UserRepository) {}

  signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    return this.userRepository.createUser(authCredentialsDto);
  }

  signIn(authCredentialsDto: AuthCredentialsDto): Promise<string> {
    return this.userRepository.signIn(authCredentialsDto);
  }
}
