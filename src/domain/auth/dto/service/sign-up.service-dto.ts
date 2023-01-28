import { User } from '@domain/user/entity/user.entity';

export class SignUpServiceDto {
  username: string;

  password: string;

  static of({ username, password }: { username: string; password: string }) {
    const user = new User();
    user.username = username;
    user.password = password;
    return user;
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
