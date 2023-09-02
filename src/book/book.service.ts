import { ForbiddenException, Injectable } from '@nestjs/common';
import { BookRepository } from './book.repository';

@Injectable()
export class BookService {
  constructor(private repository: BookRepository) {}

  async getBooks(offset: number, quantity: number) {
    return this.repository.getBooks(offset, quantity);
  }

  async createBook(data: {
    title: string;
    writer: string;
    point: number;
    quantity: number;
    tagsName: string[];
  }) {
    await this.checkBookTitleExist(data.title);
    return this.repository.createBook(
      data.title,
      data.writer,
      data.point,
      data.quantity,
      data.tagsName,
    );
  }

  async editBookById(
    bookId: number,
    data: {
      title?: string;
      writer?: string;
      point?: number;
      quantity?: number;
      tagsName?: string[];
    },
  ) {
    await this.checkBookTitleExist(data.title, bookId);
    return this.repository.editBookById(
      bookId,
      data.title,
      data.writer,
      data.point,
      data.quantity,
      data.tagsName,
    );
  }

  async checkBookTitleExist(title: string, bookId?: number) {
    const book = await this.repository.getBookByTitle(title);

    if (bookId === book.id) return;

    if (book) throw new ForbiddenException('Book title taken');
  }
}
