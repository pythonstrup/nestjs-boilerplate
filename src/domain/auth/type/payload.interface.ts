import { TokenType } from '@domain/auth/type/token-type';

export interface Payload {
  userId: number | string;
  exp: string;
  tokenType: TokenType;
  iat: number;
}
