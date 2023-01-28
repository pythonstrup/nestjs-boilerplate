import { GoneException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class ExpiredTokenException extends GoneException {
  constructor(message = ExceptionMessage.EXPIRED_TOKEN) {
    super({ status: ExceptionStatus.EXPIRED_TOKEN, message });
  }
}
