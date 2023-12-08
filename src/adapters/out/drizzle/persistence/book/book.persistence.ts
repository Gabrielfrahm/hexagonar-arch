import { Book } from "../../../../../domain/book/entities/book";
import { BookRepositoryPort, SearchBooksParams } from "../../../../../ports/out/book/book-repository.port";
import  {books} from '../../../../../infra/orm/drizzle/schemas/book'
import { DrizzleConnection } from "../../../../../infra/orm/drizzle/connection";
import { BookMapper } from "./book.mapper";
import { and, asc, desc, eq, like } from "drizzle-orm";


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

  async findAll(params?: SearchBooksParams): Promise<Book[] | []> {
    const offset = ((params?.page ||  1) - 1)  * (params?.per_page ?? 10);
    const limit = params?.per_page || 10;
    const booksModel = await this.drizzleConnection.db.select()
      .from(books)
      .where(
        and(
          params?.name && like(books.name, `%${params.name}%`),
          params?.author &&  like(books.author, `%${params.author}%`)
        )
      )
      .limit(limit)
      .offset(offset)
      .orderBy(desc(books.created_at)).prepare().execute();

    if(booksModel){
      return booksModel.map((bookModel) => BookMapper.toEntity(bookModel));
    }
  }
}
