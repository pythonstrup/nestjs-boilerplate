import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from '@config/jwt/config.service';
import { Request } from 'express';
import { AuthService } from '@domain/auth/auth.service';
import { Payload } from '@domain/auth/type/payload.interface';

export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return this.authService.extractRefreshToken(request);
        },
      ]),
      secretOrKey: jwtConfigService.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request: Request, payload: Payload) {
    const refreshToken = this.authService.extractRefreshToken(request);
    return { refreshToken, ...payload };
  }
}
