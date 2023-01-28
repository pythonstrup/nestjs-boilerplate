import { IsBoolean } from 'class-validator';
import { Expose } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validate } from '@config/validate';

export class CookieConfig {
  @IsBoolean()
  @Expose()
  SECURE: boolean;
}

export const cookieConfig = registerAs('COOKIE', () => {
  const { SECURE } = process.env;
  return validate({ SECURE: SECURE === 'true' }, CookieConfig);
});
