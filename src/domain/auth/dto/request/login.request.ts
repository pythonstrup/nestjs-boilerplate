import { LoginServiceDto } from '@domain/auth/dto/service/login.service-dto';
import { IsString } from 'class-validator';

export class LoginRequest {
  @IsString()
  username: string;

  @IsString()
  password: string;

  public toService() {
    const dto = new LoginServiceDto();
    dto.username = this.username;
    return dto;
  }
}
