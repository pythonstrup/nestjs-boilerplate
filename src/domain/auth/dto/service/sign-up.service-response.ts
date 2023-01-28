import { User } from '@domain/user/entity/user.entity';
import { SignUpResponse } from '@domain/auth/dto/response/sign-up.response';

export class SignUpServiceResponse {
  id: number;
  username: string;

  static of(user: User) {
    const result = new SignUpServiceResponse();
    result.id = user.id;
    result.username = user.username;
    return result;
  }

  public toResponse() {
    const response = new SignUpResponse();
    response.id = this.id;
    response.username = this.username;
    return response;
  }
}
