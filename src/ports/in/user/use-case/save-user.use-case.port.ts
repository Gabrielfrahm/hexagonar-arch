import { User } from "../../../../domain/user/entities/user";
import { Either } from "../../../../shared/either";
import { UseCase } from "../../use-case.interface";

export type createUserCommand = {
  name: string;
  email: string;
  password: string;
}

export abstract class SaveUserUseCasePort<Input = createUserCommand, Output = Either<Error,User>> implements UseCase{
  abstract execute(command: Input): Promise<Output>;
}
