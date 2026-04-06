import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
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

  @Get('whoami')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '현재 유저' })
  whoAmI(@GetUser() user: UserResponseDto) {
    return this.authService.whoAmI(user);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '테스트' })
  test(@GetUser() user: UserResponseDto) {
    console.log(user);
  }
}
