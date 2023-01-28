import { IsNumber } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validate } from '@config/validate';

export class AuthConfig {
  @IsNumber()
  @Type(() => Number)
  @Expose()
  SALT_ROUNDS: number;
}

export const authConfig = registerAs('AUTH', () =>
  validate(process.env, AuthConfig),
);
