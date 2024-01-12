import { Body, Controller, Post } from '@nestjs/common';
import { SaveUserController } from '../../../../../adapters/in/http/controllers/user/save-user.controller';
import { LoginUserController } from '../../../../../adapters/in/http/controllers/user/login/login-user.controller';

@Controller('users')
export class UserRoutes {
  constructor(
    private readonly saveUserController: SaveUserController,
    private readonly loginUserController: LoginUserController,
  ) {}

  @Post()
  async saveUser(@Body() data) {
    const output = await this.saveUserController.run(data);
    if (output.isLeft()) {
      throw new Error(output.value.message);
    }
    return output.value;
  }

  @Post('/login')
  async loginUser(@Body() data) {
    const output = await this.loginUserController.run(data);
    if (output.isLeft()) {
      throw new Error(output.value.message);
    }
    return output.value;
  }
}
