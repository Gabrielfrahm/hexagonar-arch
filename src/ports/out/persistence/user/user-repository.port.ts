import { User } from "../../../../domain/user/entities/user";
import { Either } from "../../../../shared/either";
import { Connection } from "../../connection.contract";
import { Repository } from "../../repository.interface";

export interface SearchUsersParams {
  page?: number;
  per_page?: number;
  name?: string;
  email?: string;
}

export abstract class UserRepositoryPort implements Repository<User> {
  constructor(private readonly _connection: Connection){}
  abstract create(entity: User): Promise<Either<any,User>>;
  abstract findAll(params?:SearchUsersParams): Promise<Either<any,User[]>>
}
