import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class GetBooksDto {
  @Type(() => Number)
  @ApiProperty({ example: 20 })
  @IsNumber()
  @Min(0)
  offset: number;

  @Type(() => Number)
  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(1)
  quantity: number;
}
