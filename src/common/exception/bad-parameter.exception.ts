import { BadRequestException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class BadParameterException extends BadRequestException {
  constructor(message = ExceptionMessage.BAD_PARAMETER) {
    super({ status: ExceptionStatus.BAD_PARAMETER, message });
  }
}
