import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  create(
    @Body(new ValidationPipe({ transform: true }))
    authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signUp(authCredentialsDto);
  }
}
