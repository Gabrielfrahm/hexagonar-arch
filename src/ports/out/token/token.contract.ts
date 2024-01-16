import { Either } from "../../../shared/either";

export interface TokenPort {
  generateToken(payload: any, expiresIn: number | string): Promise<Either<Error, any>>;
  verifyToken(token: string): Promise<Either<Error, any>>;
}
