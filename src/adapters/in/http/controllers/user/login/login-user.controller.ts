import { LoginUserService } from "../../../../../../application/services/user/login/login-user.service";


export class LoginUserController {
  constructor(public readonly loginUserService: LoginUserService){}

  async run(input: any){
    return await this.loginUserService.loginUser(input);
  }
}
