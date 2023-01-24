import { INestApplication } from '@nestjs/common';
import { AppConfigService } from '@config/app/config.service';

export const setNestApp = (app: INestApplication) => {
  const appConfigService = app.get(AppConfigService);
};
