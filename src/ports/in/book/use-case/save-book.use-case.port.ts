import { Book } from "../../../../domain/book/entities/book";
import { UseCase } from "../../use-case.interface";

export type createCommand = {
  name: string;
  genre: string;
  author: string;
}

export abstract class SaveBookUseCasePort<Input = createCommand, Output = Book> implements UseCase{
  abstract execute(command: Input): Promise<Output>;
}
