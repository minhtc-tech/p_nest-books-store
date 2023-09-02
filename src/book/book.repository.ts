import { Injectable } from '@nestjs/common';
import { PrismaService } from '../core/prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BookRepository {
  constructor(private prisma: PrismaService) {}

  async getBooks(offset: number, quantity: number): Promise<Book[]> {
    return this.prisma.book.findMany({
      skip: offset,
      take: quantity,
      orderBy: {
        id: 'asc',
      },
      include: { tags: true },
    });
  }

  async createBook(
    title: string,
    writer: string,
    point: number,
    quantity: number,
    tagsName: string[],
  ): Promise<Book> {
    return this.prisma.book.create({
      data: {
        title,
        writer,
        point,
        quantity,
        tags: {
          connectOrCreate: tagsName.map((name) => ({
            create: { name },
            where: { name },
          })),
        },
      },
      include: { tags: true },
    });
  }

  async editBookById(
    bookId: number,
    title?: string,
    writer?: string,
    point?: number,
    quantity?: number,
    tagsName?: string[],
  ): Promise<Book> {
    return this.prisma.book.update({
      where: {
        id: bookId,
      },
      data: {
        title,
        writer,
        point,
        quantity,
        tags: {
          connectOrCreate:
            tagsName?.map((name) => ({
              create: { name },
              where: { name },
            })) || undefined,
        },
      },
      include: { tags: true },
    });
  }

  async getBookByTitle(title: string): Promise<Book> {
    return this.prisma.book.findUnique({
      where: {
        title,
      },
    });
  }
}
