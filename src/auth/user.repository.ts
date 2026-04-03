import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

const EXIST_NAME_MSG = ' already exist userName';
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
      throw new ConflictException(`[${userName}] ${EXIST_NAME_MSG} [service]`);
    }

    const user = this.create(authCredentialsDto.user);

    try {
      return await this.save(user);
    } catch (error) {
      handleDBError(userName, error);
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
        throw new ConflictException(`[${userName}] ${EXIST_NAME_MSG} [db]`);
    }
  }

  throw new InternalServerErrorException();
}
