import { User } from '@domain/user/entity/user.entity';

export class ProfileServiceDto {
  username: string;

  public static of(user: User) {
    const dto = new ProfileServiceDto();
    dto.username = user.username;
    return dto;
  }
}
