import { Book } from "@prisma/client";
import { BookRepositoryPort, SearchBooksParams } from "../../../ports/out/book/book-repository.port";
import { LoggerPort } from "../../../ports/out/logger/logger.interface";

export class FindAllBooksService {
  constructor(
    private readonly bookRepository: BookRepositoryPort,
    private readonly logger: LoggerPort
  ){}

  async findAllBooks(searchBookParams: SearchBooksParams): Promise<Book[]> {
    this.logger.logInfo('listando os livros', new Date())
    return await this.bookRepository.findAll(searchBookParams);
  }
}
