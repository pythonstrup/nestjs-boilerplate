import { SignUpServiceDto } from '@domain/auth/dto/service/sign-up.service-dto';
import { IsString } from 'class-validator';

export class SignUpRequest {
  @IsString()
  username: string;

  @IsString()
  password: string;

  public toService() {
    const dto = new SignUpServiceDto();
    dto.username = this.username;
    dto.password = this.password;
    return dto;
  }
}
