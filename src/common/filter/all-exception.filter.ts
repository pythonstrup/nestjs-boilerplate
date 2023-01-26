import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiNotFoundException } from '@exception/api-not-found.exception';
import { BadParameterException } from '@exception/bad-parameter.exception';
import { instanceToPlain } from 'class-transformer';
import { ResponseEntity } from '@common/dto/response-entity';

interface ExceptionResponse {
  status: string;
  message: string;
  [key: string]: any;
}

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);

  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: Error, host: ArgumentsHost): void {
    this.logger.error(exception, exception.stack);

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const convertException = this.convertException(exception);

    const httpStatus = convertException.getStatus();
    const { status, message, ...data } =
      convertException.getResponse() as ExceptionResponse;

    httpAdapter.reply(
      ctx.getResponse(),
      instanceToPlain(ResponseEntity.ERROR_WITH_DATA(message, status, data)),
      httpStatus,
    );
  }

  convertException(exception: Error) {
    if (!(exception instanceof HttpException)) {
      return new InternalServerErrorException(exception.message);
    }

    if (exception.name === NotFoundException.name) {
      return new ApiNotFoundException();
    }

    if (exception.name === BadRequestException.name) {
      return new BadParameterException();
    }

    return exception;
  }
}
