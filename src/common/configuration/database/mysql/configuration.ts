import { IsNumber, IsString } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { registerAs } from '@nestjs/config';
import { validate } from '@config/validate';

export class MysqlConfig {
  @IsString()
  @Expose()
  MYSQL_HOST: string;

  @IsString()
  @Expose()
  MYSQL_DATABASE: string;

  @IsString()
  @Expose()
  MYSQL_USER: string;

  @IsString()
  @Expose()
  MYSQL_PASSWORD: string;

  @IsNumber()
  @Type(() => Number)
  @Expose()
  MYSQL_PORT: number;
}

export const mysqlConfig = registerAs('MYSQL', () =>
  validate(process.env, MysqlConfig),
);
