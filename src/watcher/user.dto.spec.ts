import { UserDto } from './user.dto';

describe('UserDto', () => {
  it('should be defined', () => {
    expect(new UserDto('a', 'b', 'c')).toBeDefined();
  });
});
