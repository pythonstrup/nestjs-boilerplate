import { UnauthorizedException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class InvalidTokenException extends UnauthorizedException {
  constructor(message = ExceptionMessage.INVALID_TOKEN) {
    super({ status: ExceptionStatus.INVALID_TOKEN, message });
  }
}
