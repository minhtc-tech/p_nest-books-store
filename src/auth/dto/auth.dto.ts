import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class AuthDto {
  @ApiProperty({
    example: 'minhtc.tech@gmail.com',
    description: 'The email of an user',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123', description: 'The password of an user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(18)
  password: string;
}
