import { SaveUserService } from "../../../../../application/services/user/save-user.service";

export class SaveUserController {
  constructor(public readonly saveUserService: SaveUserService){}

  async run(input: any){
    return await this.saveUserService.saveUser(input);
  }
}
