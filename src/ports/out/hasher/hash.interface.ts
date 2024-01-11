import { Either } from "../../../shared/either";

export interface HashPort {
  hash(value: string): Promise<Either<Error,string>>;
  compare(value: string, hashedValue: string): Promise<Either<Error, boolean>>;
}
