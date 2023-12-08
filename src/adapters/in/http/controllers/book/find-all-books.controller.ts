import { FindAllBooksService } from "../../../../../application/services/book/find-all-books.service";
import { SearchBooksParams } from "../../../../../ports/out/book/book-repository.port";

export class FindAllBooksController {
  constructor(public readonly findAllBooksService: FindAllBooksService){}

  async run(searchBookParams: SearchBooksParams){
    return await this.findAllBooksService.findAllBooks(searchBookParams);
  }
}
