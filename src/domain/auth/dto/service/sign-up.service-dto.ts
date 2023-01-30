import { User } from '@domain/user/entity/user.entity';

export class SignUpServiceDto {
  username: string;

  password: string;

  static toUser({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = new User();
    user.username = username;
    user.password = password;
    return user;
  }

  static create({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const dto = new SignUpServiceDto();
    dto.username = username;
    dto.password = password;
    return dto;
  }

  public async encryptPassword(
    salt: string | number,
    callback: (
      data: string | Buffer,
      saltOrRounds: string | number,
    ) => Promise<string>,
  ) {
    this.password = await callback(this.password, salt);
  }
}
