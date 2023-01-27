import { IsString } from 'class-validator';
import { Expose } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validate } from '@config/validate';

export class AuthConfig {
  @IsString()
  @Expose()
  SALT: string;
}

export const authConfig = registerAs('JWT', () =>
  validate(process.env, AuthConfig),
);
