import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtAdapter } from '../../../../adapters/out/jwt/token.adapter';

@Injectable()
export class AuthenticationMiddleware implements CanActivate {
  constructor(private readonly TokenAdapter: JwtAdapter) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const requestCookie = request.headers.cookie ?? null;

    const cookies = {};

    if (requestCookie) {
      requestCookie.split(';').forEach((cookie: string) => {
        const [name, value] = cookie.split('=').map((c) => c.trim());
        cookies[name] = value;
      });
    }

    if (!requestCookie) {
      throw new Error('token não informado.');
    }

    const decodedUser = await this.TokenAdapter.verifyToken(cookies['test']);

    if (decodedUser.isLeft()) {
      throw new Error(decodedUser.value.message);
    }

    request.user = decodedUser;

    return true;
  }
}
