import { PassportStrategy } from '@nestjs/passport';
import { JwtConfigService } from '@config/jwt/config.service';
import { Injectable } from '@nestjs/common';
import { ExtractJwt, Strategy } from 'passport-jwt';

// JwtAuthGuard의 CanActivate에서 모든 걸 다 처리하기 때문에 Strategy 논리를 사용하는 것이 아니기 때문에 굳이 필요없다.
@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly jwtConfigService: JwtConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfigService.secret,
    });
  }
}
