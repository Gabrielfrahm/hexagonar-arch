import { Book } from "../../../domain/book/entities/book";
import { SaveBookUseCase } from "../../../domain/book/use-cases/save-book.use-case";
import { createCommand } from "../../../ports/in/book/use-case/save-book.use-case.port";
import { BookRepositoryPort } from "../../../ports/out/book/book-repository.port";

export class SaveBookService {
  constructor(
    private readonly saveBookUseCase: SaveBookUseCase,
    private readonly bookRepository: BookRepositoryPort,
  ){}

  async saveBook(command: createCommand): Promise<Book> {

    const book = await this.saveBookUseCase.execute(command);

    return await this.bookRepository.create(book);
  }
}
