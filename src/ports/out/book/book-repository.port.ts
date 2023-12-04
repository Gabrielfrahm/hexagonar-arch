import { Book } from "../../../domain/book/entities/book";
import { Connection } from "../connection.contract";
import { Repository } from "../repository.interface";

export abstract class BookRepositoryPort implements Repository<Book> {
  constructor(private readonly connection: Connection){}
  abstract create(entity: Book): Promise<Book>;
}
