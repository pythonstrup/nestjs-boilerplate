import { Module } from '@nestjs/common';
import { UserRepository } from '@domain/user/user.repository';
import { UserService } from '@domain/user/user.service';
import { UserController } from '@domain/user/user.controller';

@Module({
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService],
  controllers: [UserController],
})
export class UserModule {}
