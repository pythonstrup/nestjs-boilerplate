import {
  ClassSerializerInterceptor,
  INestApplication,
  ValidationError,
  ValidationPipe,
} from '@nestjs/common';
import { AppConfigService } from '@config/app/config.service';
import { AllExceptionFilter } from '@filter/all-exception.filter';
import { HttpAdapterHost, Reflector } from '@nestjs/core';
import { BadParameterException } from '@exception/bad-parameter.exception';
import * as cookieParser from 'cookie-parser';

export const setNestApp = (app: INestApplication) => {
  const appConfigService = app.get(AppConfigService);

  app.use(cookieParser());

  app.enableCors({
    origin: appConfigService.isProduction() ? 'https://www.example.com' : true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      stopAtFirstError: true,
      exceptionFactory: (validationErrors: ValidationError[]) => {
        return new BadParameterException(
          Object.values(validationErrors[0].constraints).join(','),
        );
      },
    }),
  );

  app.useGlobalFilters(new AllExceptionFilter(app.get(HttpAdapterHost)));

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
};
