import { User } from './user.interface';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto implements User {
  @ApiProperty()
  company: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  password: string;
}
