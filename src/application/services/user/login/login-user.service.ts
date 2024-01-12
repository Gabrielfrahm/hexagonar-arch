import { HashPort } from "../../../../ports/out/hasher/hash.interface";
import { UserRepositoryPort } from "../../../../ports/out/persistence/user/user-repository.port";
import { Either, left, right } from "../../../../shared/either";

export type loginCommand = {
  email: string;
  password: string;
}


export class LoginUserService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashAdapter: HashPort,
  ){}

  async loginUser(command: loginCommand): Promise<Either<Error,boolean>>{

    const user = await this.userRepository.findByEmail(command.email);

    if(user.isLeft()){
      return left(user.value);
    }

    const comparePassword = await this.hashAdapter.compare(command.password, user.value.password);

    if(comparePassword.isLeft()){
      return left(comparePassword.value);
    }

    if(!comparePassword.value){
      return left(new Error('email ou senha invalida'));
    }

    return right(true);
  }
}
