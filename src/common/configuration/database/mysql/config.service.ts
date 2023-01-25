import { Inject, Injectable } from '@nestjs/common';
import { mysqlConfig } from '@config/database/mysql/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class MysqlConfigService {
  constructor(
    @Inject(mysqlConfig.KEY)
    private readonly mysqlConfiguration: ConfigType<typeof mysqlConfig>,
  ) {}

  get database() {
    return this.mysqlConfiguration.MYSQL_DATABASE;
  }

  get hostname() {
    return this.mysqlConfiguration.MYSQL_HOST;
  }

  get username() {
    return this.mysqlConfiguration.MYSQL_USER;
  }

  get password() {
    return this.mysqlConfiguration.MYSQL_PASSWORD;
  }

  get port() {
    return this.mysqlConfiguration.MYSQL_PORT;
  }
}
