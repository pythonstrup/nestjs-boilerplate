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
- `typeorm`
- `@nestjs/typeorm`
- `mysql2`: promise를 사용하려면 mysql이 아닌 mysql2를 설치해야한다.
- `typeorm-naming-strategies`

```shell
npm i @nestjs/config
npm i class-validator
npm i class-transformer
npm i typeorm @nestjs/typeorm mysql2 typeorm-naming-strategies
```

## Dependencies

- `env-cmd`

```shell
npm i -D env-cmd 
```