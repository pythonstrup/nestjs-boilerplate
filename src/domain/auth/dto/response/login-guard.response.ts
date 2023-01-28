import { User } from '@domain/user/entity/user.entity';
import { LoginServiceDto } from '@domain/auth/dto/service/login.service-dto';

export class LoginGuardResponse {
  id: number;

  username: string;

  static of(user: User) {
    const dto = new LoginGuardResponse();
    dto.id = user.id;
    dto.username = user.username;
    return dto;
  }

  public toService() {
    const dto = new LoginServiceDto();
    dto.id = this.id;
    dto.username = this.username;
    return dto;
  }
}
