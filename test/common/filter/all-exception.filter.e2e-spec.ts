import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  INestApplication,
} from '@nestjs/common';
import { AppModule } from '@src/app.module';
import { setNestApp } from '@src/setNestApp';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';
import { DataSource } from 'typeorm';

@Controller('/test')
class TestController {
  @Get('/internal-server-error')
  public testInternalServerError() {
    throw new HttpException(
      { message: ExceptionStatus.INTERNAL_SERVER_ERROR },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}

describe('All Exception Filter e2e Test', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
      controllers: [TestController],
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

  describe('API NOT FOUND Exception', () => {
    const url = () => `/v1/test/api-not-found`;

    test('없는 API를 요청하면 API NOT FOUND Exception을 반환한다.', async () => {
      // given

      // when
      const result = await request(app.getHttpServer()).get(url());

      // then
      expect(result.status).toEqual(HttpStatus.NOT_FOUND);
      expect(result.body.message).toEqual(ExceptionMessage.API_NOT_FOUND);
      expect(result.body.status).toEqual(ExceptionStatus.API_NOT_FOUND);
    });
  });

  describe('Internal Server Error Exception', () => {
    const url = () => `/v1/test/internal-server-error`;

    test('알 수 없는 HttpException이 반환되면 Internal Server Error Exception을 반환한다.', async () => {
      // given

      // when
      const result = await request(app.getHttpServer()).get(url());

      // then
      expect(result.status).toEqual(HttpStatus.INTERNAL_SERVER_ERROR);
      expect(result.body.message).toEqual(
        ExceptionStatus.INTERNAL_SERVER_ERROR,
      );
      expect(result.body.status).toEqual(ExceptionStatus.INTERNAL_SERVER_ERROR);
    });
  });
});
