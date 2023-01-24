import { Inject, Injectable } from '@nestjs/common';
import { appConfig, NodeEnv } from '@config/app/configuration';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  constructor(
    @Inject(appConfig.KEY)
    private readonly appConfiguration: ConfigType<typeof appConfig>,
  ) {}

  get port() {
    return this.appConfiguration.SERVER_PORT;
  }

  get env() {
    return this.appConfiguration.NODE_ENV;
  }

  isDevelopment() {
    return this.env === NodeEnv.DEVELOPMENT;
  }

  isProduction() {
    return this.env === NodeEnv.PRODUCTION;
  }

  isTest() {
    return this.env === NodeEnv.TEST;
  }
}
