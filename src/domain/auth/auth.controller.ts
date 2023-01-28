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
  public async login(@Req() request, @Res() response: Response) {
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
      .status(HttpStatus.OK)
      .json(ResponseEntity.OK());
  }
}
