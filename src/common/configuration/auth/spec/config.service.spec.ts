import { Test } from '@nestjs/testing';
import { AuthConfigService } from '@config/auth/config.service';
import { AuthConfigModule } from '@config/auth/config.module';

describe('AuthConfigService Unit Test', () => {
  let authConfigService: AuthConfigService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AuthConfigModule],
    }).compile();

    authConfigService = module.get<AuthConfigService>(AuthConfigService);
  });

  test('salt를 가져온다.', async () => {
    // given
    const salt = process.env.SALT;

    // when

    // then
    expect(authConfigService.salt).toEqual(salt);
  });
});
