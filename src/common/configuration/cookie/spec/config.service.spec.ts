import { Test } from '@nestjs/testing';
import { CookieConfigService } from '@config/cookie/config.service';
import { CookieConfigModule } from '@config/cookie/config.module';

describe('JwtConfigService Unit Test', () => {
  let cookieConfigService: CookieConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [CookieConfigModule],
    }).compile();

    cookieConfigService = module.get<CookieConfigService>(CookieConfigService);
  });

  test('SECURE을 가져온다.', async () => {
    // given
    const secure = Boolean(process.env.SECURE);

    // when

    // then
    expect(cookieConfigService.secure).toEqual(secure);
  });
});
