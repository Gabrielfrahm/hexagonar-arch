import { Book } from "../../../domain/book/entities/book";
import { Connection } from "../connection.contract";
import { Repository } from "../repository.interface";

export interface SearchBooksParams {
  page?: number;
  per_page?: number;
  name?: string;
  genre?: string;
  author?: string;
}


export abstract class BookRepositoryPort implements Repository<Book> {
  constructor(private readonly _connection: Connection){}
  abstract create(entity: Book): Promise<Book>;
  abstract findAll(params?:SearchBooksParams): Promise<Book[]>
}
