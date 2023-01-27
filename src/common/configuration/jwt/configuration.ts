import { IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validate } from '@config/validate';
import * as process from 'process';

export class JwtConfig {
  @IsString()
  @Expose()
  JWT_SECRET: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  JWT_ACCESS_TOKEN_EXPIRATION_MINUTES: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  JWT_REFRESH_TOKEN_EXPIRATION_DAYS: number;
}

export const jwtConfig = registerAs('JWT', () =>
  validate(process.env, JwtConfig),
);
