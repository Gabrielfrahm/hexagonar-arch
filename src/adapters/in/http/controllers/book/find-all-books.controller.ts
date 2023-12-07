import { FindAllBooksService } from "../../../../../application/services/book/find-all-books.service";

export class FindAllBooksController {
  constructor(public readonly findAllBooksService: FindAllBooksService){}

  async run(){
    return await this.findAllBooksService.findAllBooks();
  }
}
