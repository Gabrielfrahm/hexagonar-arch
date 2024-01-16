import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { SaveBookController } from '../../../../../adapters/in/http/controllers/book/save-book.controller';
import { FindAllBooksController } from '../../../../../adapters/in/http/controllers/book/find-all-books.controller';
import { SearchBooksParams } from '../../../../../ports/out/persistence/book/book-repository.port';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';

@Controller('books')
export class BookRoutes {
  constructor(
    private readonly saveBookController: SaveBookController,
    private readonly findAllBooksController: FindAllBooksController,
  ) {}

  @Post()
  async saveBook(@Body() data) {
    const output = await this.saveBookController.run(data);
    if (output.isLeft()) {
      throw new Error(output.value.message);
    }
    return output.value;
  }

  @Get()
  @UseGuards(AuthenticationMiddleware)
  async findAllBooks(@Query() searchBookParams: SearchBooksParams) {
    return await this.findAllBooksController.run(searchBookParams);
  }
}
