import { AppConfigService } from '@config/app/config.service';
import { AppConfigModule } from '@config/app/config.module';
import { Test } from '@nestjs/testing';
import * as process from 'process';

describe('App Config Service Test', () => {
  let appConfigService: AppConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppConfigModule],
    }).compile();

    appConfigService = module.get(AppConfigService);
  });

  test('환경변수로 설정된 SERVER_PORT를 성공적으로 가져오는가', async () => {
    // given

    // when

    // then
    expect(appConfigService.port).toEqual(
      parseInt(process.env.SERVER_PORT, 10),
    );
  });

  test('환경변수로 설정된 NODE_ENV를 성공적으로 가져오는가', async () => {
    // given

    // when

    // then
    expect(appConfigService.env).toEqual(process.env.NODE_ENV);
  });
});
