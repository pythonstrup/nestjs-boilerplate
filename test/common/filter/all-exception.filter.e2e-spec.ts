import { HttpStatus, INestApplication } from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { setNestApp } from '@src/setNestApp';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

describe('All Exception Filter e2e Test', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    setNestApp(app);
    await app.init();
  });

  describe('API NOT FOUND Exception', () => {
    const url = () => `/api-not-found`;

    test('없는 API를 요청하면 API NOT FOUND Exception을 반환한다.', async () => {
      // given

      // when
      const result = await request(app.getHttpServer()).post(url());

      // then
      expect(result.status).toEqual(HttpStatus.NOT_FOUND);
      expect(result.body.message).toEqual(ExceptionMessage.API_NOT_FOUND);
      expect(result.body.status).toEqual(ExceptionStatus.API_NOT_FOUND);
    });
  });
});
