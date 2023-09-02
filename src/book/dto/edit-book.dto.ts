import { ApiPropertyOptional } from '@nestjs/swagger';
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

export class EditBookDto {
  @ApiPropertyOptional({ example: 'A Promised Land' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ example: 'Barack Obama' })
  @IsString()
  @MinLength(3)
  @MaxLength(200)
  writer: string;

  @ApiPropertyOptional({ example: 9 })
  @IsNumber()
  @Min(1)
  point: number;

  @ApiPropertyOptional({ example: 3 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ example: ['fiction', 'novel'] })
  @IsArray()
  @IsString({ each: true })
  @MinLength(1, { each: true })
  @ArrayUnique()
  @ArrayMaxSize(20)
  tagsName: string[];
}
