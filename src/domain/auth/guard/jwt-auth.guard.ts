import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { NoTokenException } from '@domain/auth/exception/no-token.exception';
import { JwtConfigService } from '@config/jwt/config.service';
import { InvalidTokenException } from '@domain/auth/exception/invalid-token.exception';
import { ExpiredTokenException } from '@domain/auth/exception/expired-token.exception';
import { ExceptionStatus } from '@common/util/exception-status';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();

    const { access_token } = request.cookies;

    if (!access_token) {
      throw new NoTokenException();
    }

    request.user = this.validateToken(access_token);
    return true;
  }

  private validateToken(token: string) {
    const secretKey = this.jwtConfigService.secret;

    try {
      return this.jwtService.verify(token, { secret: secretKey });
    } catch (e) {
      switch (e.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new InvalidTokenException();
        case 'EXPIRED_TOKEN':
          throw new ExpiredTokenException();
        default:
          throw new HttpException(
            ExceptionStatus.INTERNAL_SERVER_ERROR,
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
      }
    }
  }
}
