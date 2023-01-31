import { FindUserServiceDto } from '@domain/user/dto/service/find-user.service-dto';
import { IsOptional, IsString } from 'class-validator';

export class FindUserRequest {
  @IsOptional()
  @IsString()
  username: string;

  public toService() {
    const dto = new FindUserServiceDto();
    dto.username = this.username;
    return dto;
  }
}
