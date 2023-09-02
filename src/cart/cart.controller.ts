import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { CartService } from './cart.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from '../core/guard';
import { GetUser } from '../core/decorator';
import { UpdateCartItemDto } from './dto';

@ApiBearerAuth()
@ApiTags('cart')
@UseGuards(JwtGuard)
@ApiResponse({
  status: HttpStatus.UNAUTHORIZED,
  description: 'Unauthorized',
})
@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @ApiOperation({ summary: 'Get cart information after authentication' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The cart information',
  })
  @Get()
  getMe(@GetUser('id') userId: number) {
    return this.cartService.getCart(userId);
  }

  @ApiOperation({ summary: 'Update cart item' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update cart success message',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Update cart not allowed message',
  })
  @Patch()
  updateCartItem(
    @GetUser('id') userId: number,
    @Body() dto: UpdateCartItemDto,
  ) {
    return this.cartService.updateCartItem(userId, dto.bookId, dto.quantity);
  }
}
