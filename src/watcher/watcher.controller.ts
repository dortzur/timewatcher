import { Body, Controller, Get, Post } from '@nestjs/common';
import { WatcherService } from './watcher.service';
import { User } from './user.interface';

@Controller('watcher')
export class WatcherController {
  constructor(private readonly watcherService: WatcherService) {}

  @Post('checkin')
  async checkin(@Body() user: User): Promise<string> {
    const result = await this.watcherService.checkin(user);
    return 'checkin';
  }

  @Post('checkout')
  async checkout(@Body() user: User): Promise<string> {
    const result = await this.watcherService.checkout(user);
    return 'checkout';
  }
}
