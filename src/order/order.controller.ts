import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../core/guard';
import { OrderService } from './order.service';
import { GetUser } from '../core/decorator';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto';

@ApiTags('order')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get orders data of an user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Orders information',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard)
  @Get()
  getAllOrder(@GetUser('id') userId: number) {
    return this.orderService.getAllOrder(userId);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create order base on the current cart' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The created order information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Some condition does not meet to create an order',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Unauthorized',
  })
  @UseGuards(JwtGuard)
  @Post()
  createOrder(@GetUser('id') userId: number, @Body() dto: CreateOrderDto) {
    return this.orderService.createOrder(
      userId,
      dto.address,
      dto.phone,
      dto.note,
    );
  }

  @ApiOperation({
    summary:
      'Update order status (PENDING | DELIVERING | COMPLETED | CANCELLED)',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The order information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Order ID does not exist',
  })
  @Patch(':id/status')
  updateOrderStatus(
    @Param('id', ParseIntPipe) orderId: number,
    @Body() dto: UpdateOrderStatusDto,
  ) {
    return this.orderService.updateOrderStatus(orderId, dto.status);
  }
}
