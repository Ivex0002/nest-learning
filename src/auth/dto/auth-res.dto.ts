import { UserResponseDto } from './user-res.dto';

export class AuthResponseDto {
  user: UserResponseDto;
  accessToken: string;
}
