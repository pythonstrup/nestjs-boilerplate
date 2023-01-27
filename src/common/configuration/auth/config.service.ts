import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { authConfig } from '@config/auth/configuration';

@Injectable()
export class AuthConfigService {
  constructor(
    @Inject(authConfig.KEY)
    private readonly authConfiguration: ConfigType<typeof authConfig>,
  ) {}

  get salt() {
    return this.authConfiguration.SALT;
  }
}
