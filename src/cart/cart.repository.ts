import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class CartRepository {
  constructor(private prisma: PrismaService) {}

  async getCart(userId: number) {
    return this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          select: {
            quantity: true,
            book: true,
          },
        },
      },
    });
  }

  async checkAllowUpdate(bookId: number, quantity: number): Promise<Book> {
    return this.prisma.book.findFirst({
      where: {
        id: bookId,
        quantity: {
          gte: quantity,
        },
      },
    });
  }

  async deleteCartItem(userId: number, bookId: number) {
    await this.prisma.cartItem.delete({
      where: {
        bookId_cartId: {
          bookId,
          cartId: userId,
        },
      },
    });
  }

  async updateCartItem(userId: number, bookId: number, quantity: number) {
    const cartId = userId;

    await this.prisma.cartItem.upsert({
      where: {
        bookId_cartId: {
          bookId,
          cartId,
        },
      },
      update: {
        quantity,
      },
      create: {
        bookId,
        cartId,
        quantity,
      },
    });
  }
}
