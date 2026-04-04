import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { UserResponseDto } from './dto/user-res.dto';
import { User } from './entities/user.entity';

interface RequestWithUser extends Request {
  user: User;
}

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): UserResponseDto => {
    const req = ctx.switchToHttp().getRequest<RequestWithUser>();
    const user = new UserResponseDto(req.user);
    return user;
  },
);
