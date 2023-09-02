import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto, EditBookDto, GetBooksDto } from './dto';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(private bookService: BookService) {}

  @ApiOperation({
    summary: 'List of buy - Get books by offset for infinite scroll',
  })
  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Books data by offset',
  })
  getBooks(@Query() dto: GetBooksDto) {
    return this.bookService.getBooks(dto.offset, dto.quantity);
  }

  @ApiOperation({ summary: 'Create a book' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The book information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Book title taken',
  })
  @Post()
  createBook(@Body() dto: CreateBookDto) {
    return this.bookService.createBook({ ...dto });
  }

  @ApiOperation({ summary: 'Edit a book' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The book information',
  })
  @ApiResponse({
    status: HttpStatus.FORBIDDEN,
    description: 'Book title taken',
  })
  @Patch(':id')
  editBook(
    @Param('id', ParseIntPipe) bookId: number,
    @Body() dto: EditBookDto,
  ) {
    return this.bookService.editBookById(bookId, { ...dto });
  }
}
