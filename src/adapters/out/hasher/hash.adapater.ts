import { HashPort } from "../../../ports/out/hasher/hash.interface";
import {hashSync, compareSync} from "bcrypt";
import { Either, left, right } from "../../../shared/either";

export class HashAdapter implements HashPort {
  private salt: number;

  constructor(salt: number){
    this.salt = salt;
  }

  async hash(value: string): Promise<Either<Error, string>> {
    try {
      const hashedValue = hashSync(value, this.salt);
      return right(hashedValue);
    }catch(e){
      return left(new Error('Erro ao realizar o hash do valor'))
    }
  }

  async compare(value: string, hashedValue: string): Promise<Either<Error, boolean>> {
    try{
      const isValid = compareSync(value, hashedValue);
      return right(isValid);
    }catch(e) {
      return left(new Error('erro ao comparar valores'))
    }
  }
}
