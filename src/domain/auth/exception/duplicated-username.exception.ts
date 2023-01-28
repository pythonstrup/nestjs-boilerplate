import { BadRequestException } from '@nestjs/common';
import { ExceptionMessage } from '@common/util/exception-message';
import { ExceptionStatus } from '@common/util/exception-status';

export class DuplicatedUsernameException extends BadRequestException {
  constructor(message = ExceptionMessage.DUPLICATED_USERNAME) {
    super({ status: ExceptionStatus.DUPLICATED_USERNAME, message });
  }
}
