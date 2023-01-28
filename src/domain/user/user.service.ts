import { Injectable } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';
import { User } from '@domain/user/entity/user.entity';
import { SignUpServiceDto } from '@domain/auth/dto/service/sign-up.service-dto';
import { ProfileServiceDto } from '@domain/user/dto/service/profile.service-dto';
import { ProfileServiceResponse } from '@domain/user/dto/service/profile.service-response';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public async findUser(username: string) {
    return await this.userRepository.findOneBy({ username });
  }

  public async createUser(signupDto: SignUpServiceDto) {
    const user = User.signup(signupDto);
    return await this.userRepository.save(user);
  }

  public async showProfile(dto: ProfileServiceDto) {
    const user = await this.userRepository.findOneBy({
      username: dto.username,
    });
    return ProfileServiceResponse.of(user);
  }
}
