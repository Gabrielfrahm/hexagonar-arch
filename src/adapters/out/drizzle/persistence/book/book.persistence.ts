import { Book } from "../../../../../domain/book/entities/book";
import { BookRepositoryPort } from "../../../../../ports/out/book/book-repository.port";
import  {books} from '../../../../../infra/orm/drizzle/schemas/book'
import { DrizzleConnection } from "../../../../../infra/orm/drizzle/connection";
import { BookMapper } from "./book.mapper";


export class PersistenceBook extends BookRepositoryPort {


  constructor(private readonly drizzleConnection : DrizzleConnection){
    super(drizzleConnection);
  }

  async create(entity: Book): Promise<Book> {
    await this.drizzleConnection.db.transaction(async (tx) => {
      await tx.insert(books).values({
        id: entity.id,
        name: entity.name,
        author: entity.author,
        genre: entity.genre
      }).prepare().execute();
    })

    return entity;
  }

  async findAll(): Promise<Book[] | []> {
    const booksModel = await this.drizzleConnection.db.select().from(books).prepare().execute();;
    if(booksModel){
      return booksModel.map((bookModel) => BookMapper.toEntity(bookModel));
    }
  }

}
