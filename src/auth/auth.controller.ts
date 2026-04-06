import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UseGuards,
  Get,
  Logger,
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
  private logger = new Logger('AuthController');
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
    Logger.log(user);
    return this.authService.whoAmI(user);
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  @ApiOperation({ summary: '테스트' })
  test(@GetUser() user: UserResponseDto) {
    // 단순 데이터 반환
    // UserResponseDto { id: 14, userName: 'user2' }
    console.log(user);

    // 시간, app 까지 반환
    // [Nest] 9044  - 2026. 04. 06. 오후 12:07:04     LOG [AuthController] UserResponseDto {
    //   id: 14,
    //   userName: 'user2'
    // }
    this.logger.log(user);
  }
}
