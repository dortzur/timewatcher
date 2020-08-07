import { Injectable } from '@nestjs/common';
import { User } from './user.interface';

import { WatcherClient } from './watcher.client';

@Injectable()
export class WatcherService {
  constructor(private checkinClient: WatcherClient) {}

  checkin(user: User) {
    return this.checkinClient.checkin(user);
  }

  checkout(user: User) {
    return this.checkinClient.checkout(user);
  }
}
