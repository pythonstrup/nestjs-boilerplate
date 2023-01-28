import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CommonEntity } from '@common/entity/common.entity';
import { SignUpServiceDto } from '@domain/auth/dto/service/sign-up.service-dto';

@Entity({ name: 'user' })
export class User extends CommonEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 30, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  password: string;

  static signup(signupDto: SignUpServiceDto) {
    const user = new User();
    user.username = signupDto.username;
    user.password = signupDto.password;
    return user;
  }

  static create({
    username,
    password,
  }: {
    username: string;
    password: string;
  }) {
    const user = new User();
    user.username = username;
    user.password = password;
    return user;
  }
}
