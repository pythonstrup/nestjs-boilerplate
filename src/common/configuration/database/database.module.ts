import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@config/database/typeorm/config.service';
import { TypeOrmConfigModule } from '@config/database/typeorm/config.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [TypeOrmConfigModule],
      useExisting: TypeOrmConfigService,
    }),
  ],
})
export class DatabaseModule {}
