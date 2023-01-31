import { setNestApp } from '@src/setNestApp';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { User } from '@domain/user/entity/user.entity';
import * as request from 'supertest';
import { getUserFixture } from '@domain/user/__test__/user.fixture';
import { AppModule } from '@src/app.module';

describe('Interceptor e2e Test', () => {
  let app: INestApplication;
  let dataSource: DataSource;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();

    // ClassSerializerInterceptor 적용
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

  // 여기서 2가지를 테스트한다.
  // getter 메소드가 정상적으로 JSON 변환이 되었는지
  // private 멤버 변수가 JSON에서 정상적으로 제외되었는지
  test('유저 정보를 조회할 때 주요 정보들을 숨긴 상태로 반환해준다.', async () => {
    // given
    const url = (username: string) => `/v1/user?username=${username}`;
    const id = 1;
    const username = 'pythonstrup';
    const user = getUserFixture({ id, username });
    const userRepository = await dataSource.getRepository(User);
    await userRepository.save(user);

    // when
    const res = await request(app.getHttpServer()).get(url(username));

    // then
    expect(res.status).toBe(HttpStatus.OK);

    const body = res.body;
    expect(body.status).toBe('OK');
    expect(body._status).toBeUndefined();
    expect(body.message).toBe('');
    expect(body._message).toBeUndefined();
    expect(body.data.id).toBe(1);
    expect(body.data.username).toBe(username);
    expect(body._data).toBeUndefined();
  });
});
