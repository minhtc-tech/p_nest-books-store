import { ForbiddenException, Injectable } from '@nestjs/common';
import { OrderRepository } from './order.repository';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private repository: OrderRepository) {}

  async getAllOrder(userId: number) {
    return this.repository.getAllOrder(userId);
  }

  async createOrder(
    userId: number,
    address: string,
    phone: string,
    note?: string,
  ) {
    const cartItems = await this.repository.getCartItems(userId);

    if (cartItems.items.length <= 0) {
      throw new ForbiddenException(
        'Please add at least one item in cart before order',
      );
    }

    const isAllowToBuy = cartItems.items.every(
      (item) => item.quantity <= item.book.quantity,
    );

    if (!isAllowToBuy) {
      throw new ForbiddenException(
        'Please check your cart, there are some items that over the max quantity',
      );
    }

    const updatedBooksItem = cartItems.items.map((item) => ({
      ...item.book,
      quantity: item.book.quantity - item.quantity,
    }));
    await this.repository.updateBookItemsQty(updatedBooksItem);

    const order = await this.repository.initOrder(userId, address, phone, note);

    const orderItems = cartItems.items.map((item) => ({
      quantity: item.quantity,
      orderPoint: item.book.point,
      orderId: order.id,
      bookId: item.book.id,
    }));

    return this.repository.createOrder(order.id, userId, orderItems);
  }

  async updateOrderStatus(orderId: number, status: OrderStatus) {
    const order = await this.repository.getOrderById(orderId);

    if (!order) {
      throw new ForbiddenException('The order ID does not exist');
    }

    return this.repository.updateOrderStatus(orderId, status);
  }
}
