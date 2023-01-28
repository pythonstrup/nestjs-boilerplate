import { UnauthorizedException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class NoTokenException extends UnauthorizedException {
  constructor(message = ExceptionMessage.NO_TOKEN) {
    super({ status: ExceptionStatus.NO_TOKEN, message });
  }
}
