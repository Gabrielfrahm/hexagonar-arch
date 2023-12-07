import { SaveBookService } from "../../../../../application/services/book/save-book.service";

export class SaveBookController {
  constructor(public readonly saveBookService: SaveBookService){}

  async run(input: any){
    return await this.saveBookService.saveBook(input);
  }
}
