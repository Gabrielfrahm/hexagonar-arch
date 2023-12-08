import { Book } from "@prisma/client";
import { BookRepositoryPort, SearchBooksParams } from "../../../ports/out/book/book-repository.port";

export class FindAllBooksService {
  constructor(
    private readonly bookRepository: BookRepositoryPort,
  ){}

  async findAllBooks(searchBookParams: SearchBooksParams): Promise<Book[]> {
    return await this.bookRepository.findAll(searchBookParams);
  }
}
