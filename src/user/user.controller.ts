import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../core/decorator';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { JwtGuard } from '../core/guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('users')
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized',
})
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @ApiOperation({ summary: 'Get user information after authentication' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user information',
  })
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @ApiOperation({ summary: 'Edit user information' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Email taken',
  })
  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
