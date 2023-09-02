import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({ example: 'Ha Noi, Vietnam' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ example: '+841629736580' })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @ApiPropertyOptional({ example: 'Please deliver in the morning' })
  @IsString()
  note: string;
}
