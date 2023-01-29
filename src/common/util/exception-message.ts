export enum ExceptionMessage {
  API_NOT_FOUND = '해당하는 API가 존재하지 않습니다.',
  BAD_PARAMETER = '입력값이 올바르지 않습니다',
  USER_NOT_FOUND = '해당 유저가 존재하지 않습니다.',
  INVALID_PASSWORD = '비밀번호가 틀렸습니다.',
  DUPLICATED_USERNAME = '유저 이름이 중복되었습니다.',
  NO_TOKEN = '토큰이 전송되지 않았습니다.',
  INVALID_TOKEN = '토큰이 유효하지 않습니다.',
  EXPIRED_TOKEN = '토큰이 만료되었습니다.',
  EXPIRED_REFRESH_TOKEN = '리프레시 토큰이 만료되었습니다. 다시 로그인 해주세요.',
  EXISTED_TOKEN = '이미 유효한 토큰이 존재합니다.',
  INVALID_REFRESH_TOKEN = '리프레시 토큰이 유효하지 않습니다.',
  INVALID_ACCESS = '유저 권한이 없습니다. 다시 로그인 해주세요.',
}
