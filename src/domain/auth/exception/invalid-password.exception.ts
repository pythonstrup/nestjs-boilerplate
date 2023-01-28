import { UnauthorizedException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class InvalidPasswordException extends UnauthorizedException {
  constructor(message = ExceptionMessage.INVALID_PASSWORD) {
    super({ status: ExceptionStatus.INVALID_PASSWORD, message });
  }
}
