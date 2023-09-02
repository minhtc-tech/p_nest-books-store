import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min } from 'class-validator';

export class UpdateCartItemDto {
  @ApiProperty({ example: 1 })
  @IsNumber()
  bookId: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  @Min(0)
  quantity: number;
}
