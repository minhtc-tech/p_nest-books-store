import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '@prisma/client';
import { IsEnum } from 'class-validator';

export class UpdateOrderStatusDto {
  @ApiProperty({
    example: 'CANCELLED',
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
