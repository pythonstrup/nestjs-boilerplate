import { NotFoundException } from '@nestjs/common';
import { ExceptionStatus } from '@common/util/exception-status';
import { ExceptionMessage } from '@common/util/exception-message';

export class UserNotFoundException extends NotFoundException {
  constructor(message = ExceptionMessage.USER_NOT_FOUND) {
    super({ status: ExceptionStatus.USER_NOT_FOUND, message });
  }
}
