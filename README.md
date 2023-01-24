# Nest JS Boilerplate

## 필수 세팅

- `.env.development`
- `.env.test`

## 실행

- 도커로 실행

```shell
npm run start:local
```

- 실행

```shell
npm run start:dev
```

## 테스트 실행

- 단위테스트 실행

```shell
npm run test
```

- e2e 테스트 실행

```shell
npm run test:e2e
```

## Dependencies

- 기본 `nest new [프로젝트명]` 했을 때의 의존성
- `@nestjs/config`
- `class-validator`
- `class-transformer`

```shell
npm i @nestjs/config
npm i class-validator
npm i class-transformer
```

## Dependencies

- `env-cmd`

```shell
npm i -D env-cmd 
```