import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

@Injectable()
export class WatcherService {
  checkIn(user: User) {
    return 'checkout';
  }
  checkOut(user: User) {
    return 'checkout';
  }
}
