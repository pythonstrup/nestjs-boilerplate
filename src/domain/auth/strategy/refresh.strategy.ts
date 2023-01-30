import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from '@config/jwt/config.service';
import { Request } from 'express';
import { AuthService } from '@domain/auth/auth.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    private readonly jwtConfigService: JwtConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const { refresh_token } = request.cookies;
          return refresh_token;
        },
      ]),
      secretOrKey: jwtConfigService.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request: Request) {
    const { access_token, refresh_token } = request.cookies;
    this.authService.checkAccessToken(access_token);
    return this.authService.validateRefreshToken(refresh_token);
  }
}
