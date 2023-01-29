import { BadRequestException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class ExistedTokenException extends BadRequestException {
  constructor(message = ExceptionMessage.EXISTED_TOKEN) {
    super({ status: ExceptionStatus.EXISTED_TOKEN, message });
  }
}
