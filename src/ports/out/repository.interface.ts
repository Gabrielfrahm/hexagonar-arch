import { Either } from "../../shared/either"

export interface Repository<E> {
  create(entity: E): Promise<Either<any, E | void>>
  findAll(): Promise<Either<any, E[] | void>>
}
