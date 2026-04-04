import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBody,
  ApiExtraModels,
  ApiOperation,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { GetUser } from './get-user.deco';
import { UserResponseDto } from './dto/user-res.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @ApiOperation({ summary: '회원가입' })
  @ApiExtraModels(AuthCredentialsDto)
  @ApiBody({
    schema: {
      $ref: getSchemaPath(AuthCredentialsDto),
    },
  })
  create(
    @Body(new ValidationPipe({ transform: true }))
    authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signUp(authCredentialsDto);
  }

  @Post('/signin')
  @ApiOperation({ summary: '로그인' })
  signin(
    @Body(new ValidationPipe({ transform: true }))
    authCredentialsDto: AuthCredentialsDto,
  ) {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/test')
  @ApiOperation({ summary: '테스트' })
  @UseGuards(AuthGuard())
  test(@GetUser() user: UserResponseDto) {
    console.log(user);
  }
}
