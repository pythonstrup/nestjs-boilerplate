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
- `morgan`: 로그를 간편하게 관리하기 위한 도구: [링크](https://www.npmjs.com/package/morgan)
- `@js-joda/core`

```shell
$ npm i @nestjs/config
$ npm i class-validator
$ npm i class-transformer
$ npm i typeorm @nestjs/typeorm mysql2 typeorm-naming-strategies
$ npm i morgan
$ npm i @nestjs/passport passport passport-local
$ npm i @nestjs/jwt passport-jwt
$ npm i bcrypt
$ npm i @js-joda/core
$ npm i cookie-parser
```

## devDependencies

- `env-cmd`
- `@types/passport-local`
- `@types/passport-jwt`
- `@types/bcrypt`
- `@types/cookie-parser`

```shell
$ npm i --save-dev env-cmd 
$ npm i --save-dev @types/passport-local
$ npm i --save-dev @types/passport-jwt
$ npm i --save-dev @types/bcrypt
$ npm i --save-dev @types/cookie-parser
```