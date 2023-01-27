import { Exclude, Expose } from 'class-transformer';
import { User } from '@domain/user/entity/user.entity';

export class UserTestDto {
  @Exclude() private readonly _id: number;
  @Exclude() private readonly _username: string;

  constructor(user: User) {
    this._id = user.id;
    this._username = user.username;
  }

  @Expose()
  get id(): number {
    return this._id;
  }

  @Expose()
  get username(): string {
    return this._username;
  }
}
