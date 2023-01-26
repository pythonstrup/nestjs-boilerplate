import { HttpException, HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { AllExceptionFilter } from '@filter/all-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiNotFoundException } from '@exception/api-not-found.exception';
import { ExceptionMessage } from '@common/util/exception-message';
import { BadParameterException } from '@exception/bad-parameter.exception';
import { ExceptionStatus } from '@common/util/exception-status';

const mockHttpAdapter = {
  reply: jest.fn(),
};
const mockHttpAdapterHost = {
  httpAdapter: mockHttpAdapter,
};

const mockJson = jest.fn();
const mockStatus = jest.fn().mockImplementation(() => ({
  json: mockJson,
}));
const mockGetResponse = jest.fn().mockImplementation(() => ({
  status: mockStatus,
}));
const mockHttpArgumentsHost = jest.fn().mockImplementation(() => ({
  getResponse: mockGetResponse,
  getRequest: jest.fn(),
}));
const mockArgumentsHost = {
  switchToHttp: mockHttpArgumentsHost,
  getArgByIndex: jest.fn(),
  getArgs: jest.fn(),
  getType: jest.fn(),
  switchToRpc: jest.fn(),
  switchToWs: jest.fn(),
};

describe('System header validation service', () => {
  let allExceptionsFilter: AllExceptionFilter;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module = await Test.createTestingModule({
      providers: [
        AllExceptionFilter,
        {
          provide: HttpAdapterHost,
          useValue: mockHttpAdapterHost,
        },
      ],
    }).compile();

    allExceptionsFilter = module.get<AllExceptionFilter>(AllExceptionFilter);
  });

  describe('All exception filter tests', () => {
    test('글로벌 필터가 정의되어 있어야 한다.', () => {
      expect(allExceptionsFilter).toBeDefined();
    });

    test('API Not Found Exception', () => {
      // given

      // when
      allExceptionsFilter.catch(
        new ApiNotFoundException(ExceptionMessage.API_NOT_FOUND),
        mockArgumentsHost,
      );

      // then
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockHttpAdapter.reply).toBeCalledTimes(1);
      expect(mockHttpAdapter.reply.mock.calls[0][2]).toEqual(
        HttpStatus.NOT_FOUND,
      );
      expect(mockHttpAdapter.reply.mock.calls[0][1].message).toEqual(
        ExceptionMessage.API_NOT_FOUND,
      );
      expect(mockHttpAdapter.reply.mock.calls[0][1].status).toEqual(
        ExceptionStatus.API_NOT_FOUND,
      );
    });

    test('Bad Parameter Exception', () => {
      // given

      // when
      allExceptionsFilter.catch(
        new BadParameterException(ExceptionMessage.BAD_PARAMETER),
        mockArgumentsHost,
      );

      // then
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockHttpAdapter.reply).toBeCalledTimes(1);
      expect(mockHttpAdapter.reply.mock.calls[0][2]).toEqual(
        HttpStatus.BAD_REQUEST,
      );
      expect(mockHttpAdapter.reply.mock.calls[0][1].message).toEqual(
        ExceptionMessage.BAD_PARAMETER,
      );
      expect(mockHttpAdapter.reply.mock.calls[0][1].status).toEqual(
        ExceptionStatus.BAD_PARAMETER,
      );
    });

    test('Internal Server Error Exception', () => {
      // given
      const message = 'Internal Server Error Exception';

      // when
      allExceptionsFilter.catch(
        new HttpException({ message }, HttpStatus.INTERNAL_SERVER_ERROR),
        mockArgumentsHost,
      );

      // then
      expect(mockHttpArgumentsHost).toBeCalledTimes(1);
      expect(mockHttpArgumentsHost).toBeCalledWith();
      expect(mockGetResponse).toBeCalledTimes(1);
      expect(mockGetResponse).toBeCalledWith();
      expect(mockHttpAdapter.reply).toBeCalledTimes(1);
      expect(mockHttpAdapter.reply.mock.calls[0][2]).toEqual(
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockHttpAdapter.reply.mock.calls[0][1].status).toEqual(
        ExceptionStatus.INTERNAL_SERVER_ERROR,
      );
      expect(mockHttpAdapter.reply.mock.calls[0][1].message).toEqual(message);
    });
  });
});
