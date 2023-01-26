import { INestApplication } from '@nestjs/common';
import { AppConfigService } from '@config/app/config.service';
import { AllExceptionFilter } from '@filter/all-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';

export const setNestApp = (app: INestApplication) => {
  const appConfigService = app.get(AppConfigService);

  app.enableCors({
    origin: appConfigService.isProduction() ? 'https://www.example.com' : true,
    credentials: true,
  });

  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));
};
