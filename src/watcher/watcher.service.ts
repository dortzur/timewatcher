import { Injectable } from '@nestjs/common';
import { User } from './user.interface';
// import { AxiosInstance } from 'axios';

@Injectable()
export class WatcherService {
  // private async login(user: User) {}

  checkIn(user: User) {
    return 'checkout';
  }

  checkOut(user: User) {
    return 'checkout';
  }
}
