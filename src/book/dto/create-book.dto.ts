import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMaxSize,
  ArrayUnique,
  IsArray,
  IsNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ example: 'A Promised Land' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ example: 'Barack Obama' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  writer: string;

  @ApiProperty({ example: 9 })
  @IsNumber()
  @Min(1)
  point: number;

  @ApiProperty({ example: 3 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({ example: ['fiction', 'novel'] })
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @ArrayUnique()
  @ArrayMaxSize(20)
  tagsName: string[];
}
