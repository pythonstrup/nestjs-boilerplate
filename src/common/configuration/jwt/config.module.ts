import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { jwtConfig } from '@config/jwt/configuration';
import { JwtConfigService } from '@config/jwt/config.service';

@Global()
@Module({
  imports: [ConfigModule.forFeature(jwtConfig)],
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
