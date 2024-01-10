import { Book } from "../../../../domain/book/entities/book";
import { Either } from "../../../../shared/either";
import { UseCase } from "../../use-case.interface";

export type createCommand = {
  name: string;
  genre: string;
  author: string;
}

export abstract class SaveBookUseCasePort<Input = createCommand, Output = Either<null,Book>> implements UseCase{
  abstract execute(command: Input): Promise<Output>;
}
