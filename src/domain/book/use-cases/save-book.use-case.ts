import { SaveBookUseCasePort, createCommand } from "../../../ports/in/book/use-case/save-book.use-case.port";
import { Either, left, right } from "../../../shared/either";
import { Book } from "../entities/book";


type SaveBookUseCaseResponse = Either<Error, Book>;

export class SaveBookUseCase extends SaveBookUseCasePort<createCommand, SaveBookUseCaseResponse> {
  async execute(command: createCommand): Promise<SaveBookUseCaseResponse> {
    try {
      const book = new Book({...command});
      return right(book);
    } catch(err){
      return left(new Error('test'))
    }
  }
}
