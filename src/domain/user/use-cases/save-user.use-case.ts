import { SaveUserUseCasePort, createUserCommand } from "../../../ports/in/user/use-case/save-user.use-case.port";
import { Either, left, right } from "../../../shared/either";
import { User } from "../entities/user";

type SaveUserUseCaseResponse = Either<Error, User>;

export class SaveUserUseCase extends SaveUserUseCasePort<createUserCommand, SaveUserUseCaseResponse> {
  async execute(command: createUserCommand): Promise<Either<Error, User>> {
    const user = new User({...command});
    return right(user);
  }
}
