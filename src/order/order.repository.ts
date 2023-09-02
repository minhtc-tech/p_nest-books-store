import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Book, Order, OrderItem, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderRepository {
  constructor(private prisma: PrismaService) {}

  async getAllOrder(userId: number) {
    return this.prisma.order.findMany({
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

  async getCartItems(userId: number) {
    return await this.prisma.cart.findUnique({
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

  async initOrder(
    userId: number,
    address: string,
    phone: string,
    note?: string,
  ): Promise<Order> {
    return this.prisma.order.create({
      data: {
        userId,
        address,
        phone,
        note,
      },
    });
  }

  async updateBookItemsQty(items: Book[]) {
    items.map((item) => {
      this.prisma.book.update({
        where: {
          id: item.id,
        },
        data: {
          quantity: item.quantity,
        },
      });
    });
  }

  async createOrder(orderId: number, userId: number, orderItems?: OrderItem[]) {
    await this.prisma.cartItem.deleteMany({
      where: {
        cartId: userId,
      },
    });

    await this.prisma.orderItem.createMany({
      data: orderItems,
    });

    return this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        items: true,
      },
    });
  }

  async updateOrderStatus(orderId: number, status: OrderStatus) {
    return this.prisma.order.update({
      where: {
        id: orderId,
      },
      data: {
        status,
      },
      include: {
        items: true,
      },
    });
  }

  async getOrderById(orderId: number) {
    return this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
  }
}
