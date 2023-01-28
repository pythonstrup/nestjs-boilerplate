import { Module } from '@nestjs/common';
import { AuthService } from '@domain/auth/auth.service';
import { UserModule } from '@domain/user/user.module';
import { AuthController } from '@domain/auth/auth.controller';
import { AuthConfigModule } from '@config/auth/config.module';
import { PassportModule } from '@nestjs/passport';
import { JwtAuthStrategy } from '@domain/auth/strategy/jwt-auth.strategy';
import { LocalAuthStrategy } from '@domain/auth/strategy/local-auth.strategy';
import { JwtConfigModule } from '@config/jwt/config.module';
import { CookieConfigModule } from '@config/cookie/config.module';

@Module({
  imports: [
    UserModule,
    JwtConfigModule,
    AuthConfigModule,
    CookieConfigModule,
    PassportModule,
  ],
  providers: [AuthService, JwtAuthStrategy, LocalAuthStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
