import { HashPort } from "../../../../ports/out/hasher/hash.interface";
import { UserRepositoryPort } from "../../../../ports/out/persistence/user/user-repository.port";
import { TokenPort } from "../../../../ports/out/token/token.contract";
import { Either, left, right } from "../../../../shared/either";

export type loginCommand = {
  email: string;
  password: string;
}


export class LoginUserService {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly hashAdapter: HashPort,
    private readonly tokenAdapter : TokenPort,
  ){}

  async loginUser(command: loginCommand): Promise<Either<Error,string>>{

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

    const token = await this.tokenAdapter.generateToken({
      id: user.value.id,
      name: user.value.name,
      email: user.value.email,
    }, '7d');

    if(token.isLeft()){
      return left(token.value);
    }

    return right(token.value);
  }
}
