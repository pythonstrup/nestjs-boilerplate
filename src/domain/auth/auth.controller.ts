import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from '@domain/auth/guard/local-auth.guard';
import { AuthService } from '@domain/auth/auth.service';
import { SignUpRequest } from '@domain/auth/dto/request/sign-up.request';
import { ResponseEntity } from '@common/dto/response-entity';
import { LoginGuardResponse } from '@domain/auth/dto/response/login-guard.response';
import { Response } from 'express';
import { RefreshGuard } from '@domain/auth/guard/refresh.guard';
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@domain/user/entity/user.entity';
import { LoginServiceDto } from '@domain/auth/dto/service/login.service-dto';
import { JwtAuthGuard } from '@domain/auth/guard/jwt-auth.guard';

@Controller('/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp(@Body() request: SignUpRequest) {
    const dto = await this.authService.signUp(request.toService());
    const response = dto.toResponse();
    return ResponseEntity.CREATED_WITH_DATA(response);
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  public async login(
    @Req() request,
    @Res({ passthrough: true }) response: Response,
  ) {
    this.authService.checkAccessToken(request);
    this.authService.checkRefreshToken(request);

    const guardResponse: LoginGuardResponse = request.user;
    const { accessToken, accessTokenExpires } =
      this.authService.issueAccessToken(guardResponse.toService());
    const { refreshToken, refreshTokenExpires } =
      this.authService.issueRefreshToken(guardResponse.toService());

    response
      .cookie(
        'refresh_token',
        refreshToken,
        this.authService.getCookieOptions(refreshTokenExpires),
      )
      .cookie(
        'access_token',
        accessToken,
        this.authService.getCookieOptions(accessTokenExpires),
      )
      .status(HttpStatus.NO_CONTENT);
  }

  @UseGuards(RefreshGuard)
  @Post('/refresh')
  public async refresh(
    @CurrentUser() user: User,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { accessToken, accessTokenExpires } =
      this.authService.issueAccessToken(LoginServiceDto.of(user));

    response
      .cookie(
        'access_token',
        accessToken,
        this.authService.getCookieOptions(accessTokenExpires),
      )
      .status(HttpStatus.NO_CONTENT);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  public async logout(@Res({ passthrough: true }) response: Response) {
    response
      .clearCookie('access_token')
      .clearCookie('refresh_token')
      .status(HttpStatus.NO_CONTENT);
  }
}
