import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Sign up with user email and password' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The access token for the user',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Credentials taken',
  })
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @ApiOperation({ summary: 'Log in with user email and password' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The access token for the user',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Credentials incorrect',
  })
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }
}
