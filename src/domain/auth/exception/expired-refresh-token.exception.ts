import { GoneException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class ExpiredRefreshTokenException extends GoneException {
  constructor(message = ExceptionMessage.EXPIRED_REFRESH_TOKEN) {
    super({ status: ExceptionStatus.EXPIRED_REFRESH_TOKEN, message });
  }
}
