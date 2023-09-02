import { ForbiddenException, Injectable } from '@nestjs/common';
import { CartRepository } from './cart.repository';

@Injectable()
export class CartService {
  constructor(private repository: CartRepository) {}

  async getCart(userId: number) {
    return this.repository.getCart(userId);
  }

  async updateCartItem(userId: number, bookId: number, quantity: number) {
    const book = await this.repository.checkAllowUpdate(bookId, quantity);

    if (!book) {
      throw new ForbiddenException(
        'Update cart item not allowed due to wrong book id or the quantity of this book is lesser than the required quantity',
      );
    }

    if (quantity <= 0) {
      await this.repository.deleteCartItem(userId, bookId);
    } else {
      await this.repository.updateCartItem(userId, bookId, quantity);
    }

    return {
      message: 'Update cart item succeed',
    };
  }
}
