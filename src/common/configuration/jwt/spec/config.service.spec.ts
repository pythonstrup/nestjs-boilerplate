import { JwtConfigService } from '@config/jwt/config.service';
import { JwtConfigModule } from '@config/jwt/config.module';
import { Test } from '@nestjs/testing';

describe('JwtConfigService Unit Test', () => {
  let jwtConfigService: JwtConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [JwtConfigModule],
    }).compile();

    jwtConfigService = module.get<JwtConfigService>(JwtConfigService);
  });

  test('secret를 가져온다.', async () => {
    // given
    const secret = process.env.JWT_SECRET;

    // when

    // then
    expect(jwtConfigService.secret).toEqual(secret);
  });

  test('accessTokenExpirationMinutes를 가져온다.', async () => {
    // given
    const accessTokenExpirationMinutes =
      process.env.JWT_ACCESS_TOKEN_EXPIRATION_MINUTES;
    // when
    // then
    expect(jwtConfigService.accessTokenExpirationMinutes).toEqual(
      parseInt(accessTokenExpirationMinutes, 10),
    );
  });

  test('refreshTokenExpirationDays를 잘 가져온다.', async () => {
    // given
    const refreshTokenExpirationDays =
      process.env.JWT_REFRESH_TOKEN_EXPIRATION_DAYS;
    // when
    // then
    expect(jwtConfigService.refreshTokenExpirationDays).toEqual(
      parseInt(refreshTokenExpirationDays, 10),
    );
  });
});
