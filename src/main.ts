import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setNestApp } from '@src/setNestApp';
import { AppConfigService } from '@config/app/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setNestApp(app);
  const appConfigService = app.get(AppConfigService);
  await app.listen(appConfigService.port);
}

bootstrap();
