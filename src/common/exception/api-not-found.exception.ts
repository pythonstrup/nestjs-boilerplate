import { NotFoundException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class ApiNotFoundException extends NotFoundException {
  constructor(message: string = ExceptionMessage.API_NOT_FOUND) {
    super({ status: ExceptionStatus.API_NOT_FOUND, message });
  }
}
