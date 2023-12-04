import { SaveBookUseCasePort, createCommand } from "../../../ports/in/book/use-case/save-book.use-case.port";
import { Book } from "../entities/book";


export class SaveBookUseCase extends SaveBookUseCasePort<createCommand, Book> {
  async execute(command: createCommand): Promise<Book> {
    return new Book({...command});
  }
}
