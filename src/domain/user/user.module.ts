import { Module } from '@nestjs/common';
import { UserRepository } from '@domain/user/repository/user.repository';

@Module({
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
