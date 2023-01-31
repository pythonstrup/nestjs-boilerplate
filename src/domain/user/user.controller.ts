import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@domain/auth/guard/jwt-auth.guard';
import { CurrentUser } from '@decorator/current-user.decorator';
import { User } from '@domain/user/entity/user.entity';
import { UserService } from '@domain/user/user.service';
import { ProfileServiceDto } from '@domain/user/dto/service/profile.service-dto';
import { ResponseEntity } from '@common/dto/response-entity';
import { FindUserRequest } from '@domain/user/dto/request/find-user.request';

@Controller('/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('')
  public async showAnyUser(@Query() query: FindUserRequest) {
    const result = await this.userService.findUser(query.toService());
    const response = result.toResponse();
    return ResponseEntity.OK_WITH_DATA(response);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/my')
  public async showProfile(@CurrentUser() user: User) {
    const profileDto = await this.userService.showProfile(
      ProfileServiceDto.of(user),
    );
    const response = profileDto.toResponse();
    return ResponseEntity.OK_WITH_DATA(response);
  }
}
