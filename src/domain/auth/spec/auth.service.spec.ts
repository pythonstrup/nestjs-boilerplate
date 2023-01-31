import { AuthConfigService } from '@config/auth/config.service';
import { JwtConfigService } from '@config/jwt/config.service';
import { CookieConfigService } from '@config/cookie/config.service';
import { AuthService } from '@domain/auth/auth.service';
import { UserService } from '@domain/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { getUserFixture } from '@domain/user/spec/user.fixture';
import { DuplicatedUsernameException } from '@domain/auth/exception/duplicated-username.exception';
import { SignUpServiceDto } from '@domain/auth/dto/service/sign-up.service-dto';
import { UserRepository } from '@domain/user/user.repository';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '@domain/user/entity/user.entity';
import { AuthController } from '@domain/auth/auth.controller';
import * as bcrypt from 'bcrypt';
import { LoginGuardResponse } from '@domain/auth/dto/response/login-guard.response';
import { UserNotFoundException } from '@domain/auth/exception/user-not-found.exception';
import { InvalidPasswordException } from '@domain/auth/exception/invalid-password.exception';

const mockAuthConfigService = {
  saltRounds: 10,
};
const mockJwtConfigService = {
  secret: 'secret',
  accessTokenExpirationMinutes: 30,
  refreshTokenExpirationDays: 30,
};
const mockCookieConfigService = {
  secure: false,
  sameSite: 'lax',
};

describe('AuthService Unit Test', () => {
  let authService: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        JwtService,
        UserService,
        {
          provide: UserRepository,
          useValue: getRepositoryToken(User),
        },
        {
          provide: AuthConfigService,
          useValue: mockAuthConfigService,
        },
        {
          provide: JwtConfigService,
          useValue: mockJwtConfigService,
        },
        {
          provide: CookieConfigService,
          useValue: mockCookieConfigService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
    jwtService = module.get<JwtService>(JwtService);
  });

  describe('AuthService signUp()', () => {
    test('정상적으로 실행되는 경우', async () => {
      // given
      const id = 1;
      const username = 'test';
      const password = '1234';
      const user = getUserFixture({ id, username, password });
      const request = SignUpServiceDto.create({ username, password });

      // when
      jest.spyOn(userService, 'findUser').mockResolvedValue(null);
      jest.spyOn(userService, 'createUser').mockResolvedValue(user);
      const result = await authService.signUp(request);

      // then
      expect(result.id).toBe(id);
      expect(result.username).toBe(username);
    });

    test('중복된 유저가 있는 경우 Error를 발생시킨다.', async () => {
      // given
      const id = 1;
      const username = 'test';
      const password = '1234';
      const user = getUserFixture({ id, username, password });
      const request = SignUpServiceDto.create({ username, password });

      // when
      jest.spyOn(userService, 'findUser').mockResolvedValue(user);

      // then
      await expect(async () => {
        return await authService.signUp(request);
      }).rejects.toThrowError(new DuplicatedUsernameException());
    });
  });

  describe('AuthService validateUser()', () => {
    test('정상적으로 실행되는 경우', async () => {
      // given
      const id = 1;
      const username = 'test';
      const password = '1234';
      const salt = await bcrypt.genSalt(mockAuthConfigService.saltRounds);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = getUserFixture({
        id,
        username,
        password: encryptedPassword,
      });

      // when
      jest.spyOn(userService, 'findUser').mockResolvedValue(user);
      const result: LoginGuardResponse = await authService.validateUser(
        username,
        password,
      );

      // then
      expect(result.id).toBe(id);
      expect(result.username).toBe(username);
    });

    test('유저가 존재하지 않는 경우, UserNotFoundException가 발생한다.', async () => {
      // given
      const username = 'test';
      const password = '1234';

      // when
      jest.spyOn(userService, 'findUser').mockResolvedValue(null);

      // then
      await expect(async () => {
        return await authService.validateUser(username, password);
      }).rejects.toThrowError(new UserNotFoundException());
    });

    test('유저는 존재하지만 패스워드가 다른 경우 InvalidPasswordException가 발생한다.', async () => {
      // given
      const requestPassword = 'invalid1234';
      const id = 1;
      const username = 'test';
      const password = '1234';
      const salt = await bcrypt.genSalt(mockAuthConfigService.saltRounds);
      const encryptedPassword = await bcrypt.hash(password, salt);
      const user = getUserFixture({
        id,
        username,
        password: encryptedPassword,
      });

      // when
      jest.spyOn(userService, 'findUser').mockResolvedValue(user);

      // then
      await expect(async () => {
        return authService.validateUser(username, requestPassword);
      }).rejects.toThrowError(new InvalidPasswordException());
    });
  });
});
