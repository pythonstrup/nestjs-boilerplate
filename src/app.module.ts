import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from '@src/app.controller';
import { AppService } from '@src/app.service';
import { AppConfigModule } from '@config/app/config.module';
import { DatabaseModule } from '@config/database/database.module';
import { ApiSuccessLoggerMiddleware } from '@middleware/api-success-logger.middleware';
import { AppConfigService } from '@config/app/config.service';
import { ApiExceptionLoggerMiddleware } from '@middleware/api-exception-logger.middleware';
import { UserModule } from '@domain/user/user.module';
import { AuthModule } from '@domain/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfigModule } from '@config/jwt/config.module';
import { JwtConfigService } from '@config/jwt/config.service';

@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    UserModule,
    AuthModule,
    UserModule,
    {
      ...JwtModule.registerAsync({
        imports: [JwtConfigModule],
        inject: [JwtConfigService],
        useFactory: async (jwtConfigService: JwtConfigService) => ({
          secret: jwtConfigService.secret,
          accessTokenExpirationMinutes:
            jwtConfigService.accessTokenExpirationMinutes,
          refreshTokenExpirationDays:
            jwtConfigService.refreshTokenExpirationDays,
        }),
      }),
      global: true,
    },
  ],
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
