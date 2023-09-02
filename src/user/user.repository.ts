import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../core/prisma/prisma.service';

@Injectable()
export class UserRepository {
  constructor(private prisma: PrismaService) {}

  async createUser(email: string, passwordHash: string): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email,
        passwordHash,
      },
    });

    this.prisma.cart.create({
      data: {
        userId: user.id,
      },
    });

    return user;
  }

  async getUserByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async updateUserInfo(
    userId: number,
    email?: string,
    name?: string,
    passwordHash?: string,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name,
        passwordHash,
      },
    });
  }
}
