import { Request, Response } from "express";
import { SaveBookService } from "../../../../../../application/services/book/save-book.service";

export class SaveBookController {
  constructor(public readonly saveBookService: SaveBookService){

  }

  async save(request: Request, response: Response){
    const body = request.body;
    const res =  await this.saveBookService.saveBook(body);
    return response.json(res)
  }
}
