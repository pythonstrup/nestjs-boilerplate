import { UnauthorizedException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class InvalidAccessException extends UnauthorizedException {
  constructor(message = ExceptionMessage.INVALID_ACCESS) {
    super({ status: ExceptionStatus.INVALID_ACCESS, message });
  }
}
