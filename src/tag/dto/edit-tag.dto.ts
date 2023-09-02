import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class EditTagDto {
  @ApiProperty({ example: 'fiction' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
