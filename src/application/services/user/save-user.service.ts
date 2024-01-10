import { User } from "../../../domain/user/entities/user";
import { SaveUserUseCasePort, createUserCommand } from "../../../ports/in/user/use-case/save-user.use-case.port";
import { UserRepositoryPort } from "../../../ports/out/user/user-repository.port";
import { Either } from "../../../shared/either";

export class SaveUserService {
  constructor(
    private readonly saveUserUseCase: SaveUserUseCasePort,
    private readonly userRepository: UserRepositoryPort,
  ){}

  async saveUser(command: createUserCommand): Promise<Either<Error,User>> {

    const result = await this.saveUserUseCase.execute(command);

    if(result.isLeft()){
      return result;
    }

    return await this.userRepository.create(result.value);
  }
}
