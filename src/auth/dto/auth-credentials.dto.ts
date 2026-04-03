import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class UserPayload {
  @IsNotEmpty()
  userName: string;

  @IsNotEmpty()
  password: string;
}

export class AuthCredentialsDto {
  @ValidateNested()
  @Type(() => UserPayload)
  user: UserPayload;
}
