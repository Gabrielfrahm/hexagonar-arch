import { Body, Controller, Post } from '@nestjs/common';
import { SaveUserController } from '../../../../../adapters/in/http/controllers/user/save-user.controller';
@Controller('users')
export class UserRoutes {
  constructor(private readonly saveUserController: SaveUserController) {}

  @Post()
  async saveBook(@Body() data) {
    const output = await this.saveUserController.run(data);
    if (output.isLeft()) {
      throw new Error(output.value.message);
    }
    return output.value;
  }
}
