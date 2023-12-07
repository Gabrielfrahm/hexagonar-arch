import { Book } from "@prisma/client";
import { BookRepositoryPort } from "../../../ports/out/book/book-repository.port";

export class FindAllBooksService {
  constructor(
    private readonly bookRepository: BookRepositoryPort,
  ){}

  async findAllBooks(): Promise<Book[]> {
    return await this.bookRepository.findAll();
  }
}
