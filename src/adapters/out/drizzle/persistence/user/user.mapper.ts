import { User } from "../../../../../domain/user/entities/user";
import { userModel } from "../../../../../infra/orm/drizzle/schemas/user";

export class UserMapper {
  static toEntity(model: userModel) {
    return new User({
      id: model.id,
      name: model.name,
      email: model.email,
      password: model.password,
      created_at: new Date(model.created_at),
    })
  }
}
