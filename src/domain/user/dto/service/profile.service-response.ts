import { User } from '@domain/user/entity/user.entity';
import { ProfileResponse } from '@domain/user/dto/response/profile.response';

export class ProfileServiceResponse {
  id: number;
  username: string;

  public static of(user: User) {
    const dto = new ProfileServiceResponse();
    dto.id = user.id;
    dto.username = user.username;
    return dto;
  }

  public toResponse() {
    const response = new ProfileResponse();
    response.id = this.id;
    response.username = this.username;
    return response;
  }
}
