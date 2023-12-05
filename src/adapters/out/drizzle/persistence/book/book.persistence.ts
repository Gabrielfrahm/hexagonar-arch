import { Book } from "../../../../../domain/book/entities/book";
import { BookRepositoryPort } from "../../../../../ports/out/book/book-repository.port";
import  {books} from '../../schemas/book'
import { DrizzleConnection } from '../../connection';

export class PersistenceBook extends BookRepositoryPort {

  constructor(private readonly drizzleConnection : DrizzleConnection){
    super(drizzleConnection);
  }

  async create(entity: Book): Promise<Book> {
    await this.drizzleConnection.db.transaction(async (tx) => {
      await tx.insert(books).values({
        name: entity.name,
        author: entity.author,
        genre: entity.genre
      }).prepare().execute();
    })

    return entity;
  }

}
