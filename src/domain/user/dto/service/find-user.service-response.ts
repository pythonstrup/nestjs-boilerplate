import { FindUserResponse } from '@domain/user/dto/response/find-user.response';
import { User } from '@domain/user/entity/user.entity';

export class FindUserServiceResponse {
  id: number;

  username: string;

  public static of(user: User) {
    const dto = new FindUserServiceResponse();
    dto.id = user.id;
    dto.username = user.username;
    return dto;
  }

  public toResponse() {
    const response = new FindUserResponse();
    response.id = this.id;
    response.username = this.username;
    return response;
  }
}
