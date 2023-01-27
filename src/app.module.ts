import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { AppConfigModule } from '@config/app/config.module';
import { DatabaseModule } from '@config/database/database.module';
import { ApiSuccessLoggerMiddleware } from '@middleware/api-success-logger.middleware';
import { AppConfigService } from '@config/app/config.service';
import { ApiExceptionLoggerMiddleware } from '@middleware/api-exception-logger.middleware';
import { UserModule } from '@domain/user/user.module';

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly appConfigService: AppConfigService) {}

  configure(consumer: MiddlewareConsumer) {
    if (!this.appConfigService.isTest()) {
      consumer
        .apply(ApiSuccessLoggerMiddleware, ApiExceptionLoggerMiddleware)
        .forRoutes('*');
    }
  }
}
