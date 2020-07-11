import { User } from './user.interface';

export class UserDto implements User {
  constructor(company, name, password) {
    this.company = company;
    this.name = name;
    this.password = password;
  }

  company: string;
  password: string;
  name: string;
}
