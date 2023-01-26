import { BadRequestException } from '@nestjs/common';

export class BadParameterException extends BadRequestException {
  constructor(message = ExceptionMessage.BAD_PARAMETER) {
    super({ status: ExceptionStatus.BAD_PARAMETER, message });
  }
}
