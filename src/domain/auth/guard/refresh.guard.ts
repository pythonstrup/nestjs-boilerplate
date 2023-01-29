import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvalidAccessException } from '@domain/auth/exception/invalid-access.exception';

@Injectable()
export class RefreshGuard extends AuthGuard('refresh') {
  constructor() {
    super();
  }
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (err) {
      throw err;
    }
    if (!user) {
      throw new InvalidAccessException();
    }

    return user;
  }
}
