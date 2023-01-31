import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { Test } from '@nestjs/testing';
import { AppModule } from '@src/app.module';
import { setNestApp } from '@src/setNestApp';
import * as request from 'supertest';
import { SignUpRequest } from '@domain/auth/dto/request/sign-up.request';

describe('Auth API e2e Test', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    setNestApp(app);

    dataSource = app.get(DataSource);

    await app.init();
  });

  afterEach(async () => {
    await dataSource.synchronize(true);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe('POST /v1/auth/signup - 회원가입 API', () => {
    const url = () => `/v1/auth/signup`;

    test('필요한 모든 값을 담은 요청이 오면 201 코드와 유저 데이터를 반환한다.', async () => {
      // given
      const username = 'pythonstrup';
      const password = '1234';
      const signUpRequest = SignUpRequest.create({ username, password });

      // when
      const result = await request(app.getHttpServer())
        .post(url())
        .send(signUpRequest);

      // then
      expect(result.status).toEqual(HttpStatus.CREATED);
      expect(result.body.status).toEqual('CREATED');
      expect(result.body.data.username).toEqual(username);
    });
  });
});
