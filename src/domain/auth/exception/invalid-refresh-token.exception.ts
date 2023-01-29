import { UnauthorizedException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class InvalidRefreshTokenException extends UnauthorizedException {
  constructor(message = ExceptionMessage.INVALID_REFRESH_TOKEN) {
    super({ status: ExceptionStatus.INVALID_REFRESH_TOKEN, message });
  }
}
