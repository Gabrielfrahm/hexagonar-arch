import { User } from "../../../domain/user/entities/user";
import { SaveUserUseCasePort, createUserCommand } from "../../../ports/in/user/use-case/save-user.use-case.port";
import { HashPort } from "../../../ports/out/hasher/hash.interface";
import { UserRepositoryPort } from "../../../ports/out/persistence/user/user-repository.port";
import { Either, left } from "../../../shared/either";

export class SaveUserService {
  constructor(
    private readonly saveUserUseCase: SaveUserUseCasePort,
    private readonly userRepository: UserRepositoryPort,
    private readonly hashAdapter: HashPort,
  ){}

  async saveUser(command: createUserCommand): Promise<Either<Error,User>> {
    const {password} = command;
    const hashedPasswordResult  = await this.hashAdapter.hash(password);

    if(hashedPasswordResult.isLeft()){
      return left(hashedPasswordResult.value);
    }

    const result = await this.saveUserUseCase.execute({
      ...command,
      password : hashedPasswordResult.value,
    });

    if(result.isLeft()){
      return result;
    }

    return await this.userRepository.create(result.value);
  }
}
