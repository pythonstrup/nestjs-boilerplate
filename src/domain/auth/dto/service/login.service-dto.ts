import { User } from '@domain/user/entity/user.entity';

export class LoginServiceDto {
  id: number;
  username: string;

  static of(user: User) {
    const dto = new LoginServiceDto();
    dto.id = user.id;
    dto.username = user.username;
    return dto;
  }
}
