import { applyDecorators } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
  ValidateNested,
} from 'class-validator';

function IsStandardString(min: number = 4, max: number = 20) {
  return applyDecorators(
    IsNotEmpty(),
    IsString(),
    MinLength(min),
    MaxLength(max),
  );
}
export class UserPayload {
  @ApiProperty()
  @IsStandardString()
  userName: string;

  @ApiProperty()
  @IsStandardString()
  // 정규식 : 영어랑 숫자만
  @Matches(/^[a-zA-Z0-9]*$/, {
    message: 'Invalid password. Only letters and numbers are allowed.',
  })
  password: string;
}

export class AuthCredentialsDto {
  @ApiProperty({ type: UserPayload })
  @ValidateNested()
  @Type(() => UserPayload)
  user: UserPayload;
}
