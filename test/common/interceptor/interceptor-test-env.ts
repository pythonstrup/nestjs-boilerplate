import { Controller, Get, Injectable, Module } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';
import { UserTestDto } from './user-test.dto';
import { AppConfigModule } from '@config/app/config.module';
import { DatabaseModule } from '@config/database/database.module';
import { UserModule } from '@domain/user/user.module';
import { ResponseEntity } from '@common/dto/response-entity';

@Injectable()
class TestService {
  constructor(private readonly userRepository: UserRepository) {}

  public async showUser() {
    const user = await this.userRepository.findOneBy({ id: 1 });
    return new UserTestDto(user);
  }
}

@Controller('/test')
class TestController {
  constructor(private readonly testService: TestService) {}

  @Get('/user')
  public async showUser() {
    const response = await this.testService.showUser();
    return ResponseEntity.OK_WITH_DATA(response);
  }
}

@Module({
  imports: [AppConfigModule, DatabaseModule, UserModule],
  providers: [TestService],
  controllers: [TestController],
})
export class InterceptorTestEnv {}
