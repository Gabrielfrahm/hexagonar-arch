import { Book } from "../../../../../domain/book/entities/book";
import  {books} from '../../../../../infra/orm/drizzle/schemas/book'
import { DrizzleConnection } from "../../../../../infra/orm/drizzle/connection";
import { and, desc, like } from "drizzle-orm";
import { Either, left, right } from "../../../../../shared/either";
import { SearchUsersParams, UserRepositoryPort } from "../../../../../ports/out/user/user-repository.port";
import { User } from "../../../../../domain/user/entities/user";
import { users } from "../../../../../infra/orm/drizzle/schemas/user";


export class PersistenceUser extends UserRepositoryPort {


  constructor(private readonly drizzleConnection : DrizzleConnection){
    super(drizzleConnection);
  }

  async create(entity: User): Promise<Either<Error,User>> {
    try{
      await this.drizzleConnection.db.transaction(async (tx) => {
        await tx.insert(users).values({
          id: entity.id,
          name: entity.name,
          email: entity.email,
          password: entity.password
        }).prepare().execute();
      })

      return right(entity);
    }catch(e) {
      return left(new Error('erro ao persistir usuário'));
    }
  }

  findAll(params?: SearchUsersParams): Promise<Either<any, User[]>> {
    throw new Error("Method not implemented.");
  }

  // async findAll(params?: SearchBooksParams): Promise<Either<any,Book[] | []>> {
  //   const offset = ((params?.page ||  1) - 1)  * (params?.per_page ?? 10);
  //   const limit = params?.per_page || 10;
  //   const booksModel = await this.drizzleConnection.db.select()
  //     .from(books)
  //     .where(
  //       and(
  //         params?.name && like(books.name, `%${params.name}%`),
  //         params?.author &&  like(books.author, `%${params.author}%`)
  //       )
  //     )
  //     .limit(limit)
  //     .offset(offset)
  //     .orderBy(desc(books.created_at)).prepare().execute();

  //   if(booksModel){
  //     return right(booksModel.map((bookModel) => BookMapper.toEntity(bookModel)));
  //   }
  // }
}
