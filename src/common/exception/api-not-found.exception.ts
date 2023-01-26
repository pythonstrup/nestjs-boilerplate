import { NotFoundException } from '@nestjs/common';

export class ApiNotFoundException extends NotFoundException {
  constructor(message = ExceptionMessage.API_NOT_FOUND) {
    super({ status: ExceptionStatus.API_NOT_FOUND }, message);
  }
}
