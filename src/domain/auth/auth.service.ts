import { Injectable } from '@nestjs/common';
import { UserService } from '@domain/user/user.service';
import { SignUpServiceDto } from '@domain/auth/dto/service/sign-up.service-dto';
import { SignUpServiceResponse } from '@domain/auth/dto/service/sign-up.service-response';
import { AuthConfigService } from '@config/auth/config.service';
import * as bcrypt from 'bcrypt';
import { UserNotFoundException } from '@domain/auth/exception/user-not-found.exception';
import { InvalidPasswordException } from '@domain/auth/exception/invalid-password.exception';
import { LoginServiceDto } from '@domain/auth/dto/service/login.service-dto';
import { DuplicatedUsernameException } from '@domain/auth/exception/duplicated-username.exception';
import { LoginGuardResponse } from '@domain/auth/dto/response/login-guard.response';
import { JwtService } from '@nestjs/jwt';
import { CookieOptions, Request } from 'express';
import { JwtConfigService } from '@config/jwt/config.service';
import { toLocaleDateTime } from '@common/util/date-time';
import { LocalDateTime, ZoneId, ZoneOffset } from '@js-joda/core';
import { TokenType } from '@domain/auth/type/token-type';
import { CookieConfigService } from '@config/cookie/config.service';
import { Constants } from '@common/util/constants';
import { InvalidRefreshTokenException } from '@domain/auth/exception/invalid-refresh-token.exception';
import { ExistedTokenException } from '@domain/auth/exception/existed-token.exception';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly authConfigService: AuthConfigService,
    private readonly jwtConfigService: JwtConfigService,
    private readonly cookieConfigService: CookieConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignUpServiceDto) {
    const result = await this.userService.findUser(signupDto.username);
    if (result) {
      throw new DuplicatedUsernameException();
    }

    const salt = await bcrypt.genSalt(this.authConfigService.saltRounds);
    await signupDto.encryptPassword(salt, bcrypt.hash);
    const user = await this.userService.createUser(signupDto);
    return SignUpServiceResponse.of(user);
  }

  async validateUser(username: string, password: string) {
    const user = await this.userService.findUser(username);
    if (!user) {
      throw new UserNotFoundException();
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new InvalidPasswordException();
    }
    return LoginGuardResponse.of(user);
  }

  generateToken(id: number, expires: number, tokenType: TokenType) {
    return this.jwtService.sign({
      userId: id,
      exp: expires,
      tokenType,
      iat: LocalDateTime.now(ZoneId.UTC).toEpochSecond(ZoneOffset.UTC),
    });
  }

  issueAccessToken(loginDto: LoginServiceDto) {
    const now = new Date();
    const accessTokenExpires = toLocaleDateTime(now)
      .plusMinutes(this.jwtConfigService.accessTokenExpirationMinutes)
      .toEpochSecond(ZoneOffset.UTC);

    const accessToken = this.generateToken(
      loginDto.id,
      accessTokenExpires,
      TokenType.ACCESS,
    );

    return {
      accessToken,
      accessTokenExpires,
    };
  }

  issueRefreshToken(loginDto: LoginServiceDto) {
    const now = new Date();
    const refreshTokenExpires = toLocaleDateTime(now)
      .plusDays(this.jwtConfigService.refreshTokenExpirationDays)
      .toEpochSecond(ZoneOffset.UTC);

    const refreshToken = this.generateToken(
      loginDto.id,
      refreshTokenExpires,
      TokenType.ACCESS,
    );

    return {
      refreshToken,
      refreshTokenExpires,
    };
  }

  getCookieOptions(tokenExpires: number): CookieOptions {
    return {
      httpOnly: true,
      expires: new Date(tokenExpires * Constants.MILLISECOND_TO_SECOND),
      secure: this.cookieConfigService.secure,
      sameSite: this.cookieConfigService.sameSite,
    };
  }

  checkAccessToken(request: Request) {
    const { access_token } = request.cookies;

    if (
      access_token &&
      this.jwtService.verify(access_token, {
        secret: this.jwtConfigService.secret,
      })
    ) {
      throw new ExistedTokenException();
    }
  }

  checkRefreshToken(request: Request) {
    const { refresh_token } = request.cookies;

    if (
      refresh_token &&
      this.jwtService.verify(refresh_token, {
        secret: this.jwtConfigService.secret,
      })
    ) {
      throw new ExistedTokenException();
    }
  }

  extractRefreshToken(request: Request) {
    const { refresh_token } = request.cookies;
    return refresh_token;
  }

  validateRefreshToken(refreshToken: string) {
    const verify = this.jwtService.verify(refreshToken);
    if (!verify) {
      throw new InvalidRefreshTokenException();
    }

    return verify;
  }
}
