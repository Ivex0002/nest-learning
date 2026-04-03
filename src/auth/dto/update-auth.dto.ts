import { PartialType } from '@nestjs/mapped-types';
import { UserPayload } from './auth-credentials.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class UpdateUserPayload extends PartialType(UserPayload) {}

export class UpdateUserDto {
  @ValidateNested()
  @Type(() => UpdateUserPayload)
  user: UpdateUserPayload;
}
