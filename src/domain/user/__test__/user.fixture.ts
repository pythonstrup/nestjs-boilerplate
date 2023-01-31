import { User } from '@domain/user/entity/user.entity';

export const getUserFixture = (user: Partial<User> = {}) => {
  const fixture = new User();
  fixture.id = user.id || 1;
  fixture.username = user.username || 'pythonstrup';
  fixture.password = user.password || '1234';

  return fixture;
};
