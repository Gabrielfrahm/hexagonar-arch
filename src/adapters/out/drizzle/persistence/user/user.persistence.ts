import { Book } from "../../../../../domain/book/entities/book";
import  {books} from '../../../../../infra/orm/drizzle/schemas/book'
import { DrizzleConnection } from "../../../../../infra/orm/drizzle/connection";
import { and, desc, eq, like } from "drizzle-orm";
import { Either, left, right } from "../../../../../shared/either";
import { SearchUsersParams, UserRepositoryPort } from "../../../../../ports/out/persistence/user/user-repository.port";
import { User } from "../../../../../domain/user/entities/user";
import { users } from "../../../../../infra/orm/drizzle/schemas/user";
import { UserMapper } from "./user.mapper";


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
      console.log(e);
      return left(new Error('erro ao persistir usuário'));
    }
  }

  findAll(params?: SearchUsersParams): Promise<Either<any, User[]>> {
    throw new Error("Method not implemented.");
  }

  async findByEmail(email: string): Promise<Either<any, User>> {
    const userModel = await this.drizzleConnection.db
      .select().from(users).where(eq(users.email, email));

    if(userModel.length <= 0) {
      return left(new Error('user não existe'))
    }

    return right(UserMapper.toEntity(userModel[0]));
  }

}
