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
          return this.authService.extractRefreshToken(request);
        },
      ]),
      secretOrKey: jwtConfigService.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  validate(request: Request) {
    this.authService.checkAccessToken(request);
    const refreshToken = this.authService.extractRefreshToken(request);
    return this.authService.validateRefreshToken(refreshToken);
  }
}
