import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { authConfig } from '@config/auth/configuration';
import { AuthConfigService } from '@config/auth/config.service';

@Module({
  imports: [ConfigModule.forFeature(authConfig)],
  providers: [AuthConfigService],
  exports: [AuthConfigService],
})
export class AuthConfigModule {}
