import { TokenPort } from "../../../ports/out/token/token.contract";
import { Either, left, right } from "../../../shared/either";
import {sign, verify} from 'jsonwebtoken';

interface UserJwtPayload {
  id: string;
  name: string;
  email: string;
}

export class JwtAdapter implements TokenPort {
  async generateToken(payload: UserJwtPayload, expiresIn: string | number): Promise<Either<Error, string>> {
    try {
      const token = sign(payload, '123456', {expiresIn})
      return right(token);
    }catch(e) {
      return left(new Error('Erro ao gerar token.'))
    }
  }

  async verifyToken(token: string): Promise<Either<Error, UserJwtPayload>> {
    try {
      const isValid =  verify(token,'123456');
      return right(isValid as UserJwtPayload)
    }catch(e){
      return left(new Error('Error ao verificar token'))
    }
  }

}
