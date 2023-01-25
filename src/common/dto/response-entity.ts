import { Exclude, Expose } from 'class-transformer';

export class ResponseEntity<T> {
  @Exclude() private readonly _status: string;
  @Exclude() private readonly _message: string;
  @Exclude() private readonly _data: T;

  protected constructor(status: string, message: string, data: T) {
    this._status = status;
    this._message = message;
    this._data = data;
  }

  static OK() {
    return new ResponseEntity<string>('OK', '', '');
  }

  static OK_WITH_DATA<T>(data: T) {
    return new ResponseEntity<T>('OK', '', data);
  }

  static CREATED_WITH_DATA<T>(data: T) {
    return new ResponseEntity<T>('CREATED', '', data);
  }

  static NO_CONTENT() {
    return new ResponseEntity<string>('NO_CONTENT', '', '');
  }

  static ERROR() {
    return new ResponseEntity<string>(
      'INTERNAL_SERVER_ERROR',
      '알 수 없는 에러가 발생했습니다',
      '',
    );
  }

  static ERROR_WITH(message: string, status = 'INTERNAL_SERVER_ERROR') {
    return new ResponseEntity(status, message, '');
  }

  static ERROR_WITH_DATA<T>(
    message: string,
    status = 'INTERNAL_SERVER_ERROR',
    data: T,
  ) {
    return new ResponseEntity<T>(status, message, data);
  }

  @Expose()
  get status() {
    return this._status;
  }

  @Expose()
  get message() {
    return this._message;
  }

  @Expose()
  get data(): T {
    return this._data;
  }
}
