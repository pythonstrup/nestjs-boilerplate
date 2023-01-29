import { Module } from '@nestjs/common';
import { AuthService } from '@domain/auth/auth.service';
import { UserModule } from '@domain/user/user.module';
import { AuthController } from '@domain/auth/auth.controller';
import { AuthConfigModule } from '@config/auth/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from '@domain/auth/strategy/jwt-auth.strategy';
import { LocalAuthStrategy } from '@domain/auth/strategy/local-auth.strategy';
import { CookieConfigModule } from '@config/cookie/config.module';
import { RefreshStrategy } from '@domain/auth/strategy/refresh.strategy';

@Module({
  imports: [UserModule, AuthConfigModule, CookieConfigModule, PassportModule],
  providers: [AuthService, JwtAuthStrategy, LocalAuthStrategy, RefreshStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
