import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcryptjs';

const MSG = {
  EXIST_NAME: ' already exist userName',
  NO_EXIST_NAME: ' is not exist userName',
  // LOGIN: 'logined',
  INCORRECT_PASSWORD: 'incorrect password',
};
@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const userName = authCredentialsDto.user.userName;
    const isExistName = await this.findOneBy({
      userName,
    });
    if (isExistName) {
      throw new ConflictException(`[${userName}] ${MSG.EXIST_NAME} [repo]`);
    }

    const user = this.create(authCredentialsDto.user);

    try {
      return await this.save(user);
    } catch (error) {
      handleDBError(userName, error);
    }
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    const { userName, password } = authCredentialsDto.user;
    const user = await this.findOne({ where: { userName: userName } });
    if (!user)
      throw new ConflictException(`[${userName}] ${MSG.NO_EXIST_NAME} [repo]`);
    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (isCorrectPassword) {
      return user;
    } else {
      throw new UnauthorizedException(MSG.INCORRECT_PASSWORD);
    }
  }
}

function handleDBError(userName: string, error: unknown): never {
  if (error instanceof QueryFailedError) {
    const err = error as QueryFailedError & {
      driverError?: { code?: string };
    };

    switch (err.driverError?.code) {
      case '23505':
        throw new ConflictException(`[${userName}] ${MSG.EXIST_NAME} [db]`);
    }
  }

  throw new InternalServerErrorException();
}
