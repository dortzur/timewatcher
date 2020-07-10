import { User } from './user.interface';

export class UserDto implements User {
  company: string;
  password: string;
  user: string;
}
