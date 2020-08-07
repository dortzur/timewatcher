import {
  Body,
  Controller,
  DefaultValuePipe,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { WatcherService } from './watcher.service';
import { User } from './user.interface';
import randomInt from 'random-int';
import { ApiBody, ApiQuery } from '@nestjs/swagger/dist';
import { UserDto } from './user.dto';

const MINUTES_MULTIPLAYER = 1000 * 60;
const wait = minutes =>
  new Promise((resolve, reject) => {
    setTimeout(resolve, minutes * MINUTES_MULTIPLAYER);
  });

const randWait = maxMinutes => {
  const randMinutes = randomInt(0, maxMinutes);
  return wait(randMinutes);
};

@Controller('watcher')
export class WatcherController {
  constructor(private readonly watcherService: WatcherService) {}

  @Post('checkin')
  @ApiBody({ type: UserDto })
  @ApiQuery({ name: 'max_wait', required: false })
  async checkin(
    @Body() user: User,
    @Query('max_wait', new DefaultValuePipe(0), new ParseIntPipe())
    maxWait?: number
  ): Promise<string> {
    if (maxWait == 0) {
      await this.watcherService.checkin(user);
    } else {
      randWait(maxWait).then(() => {
        this.watcherService.checkin(user);
      });
    }

    return `Great Success`;
  }

  @Post('checkout')
  @ApiBody({ type: UserDto })
  @ApiQuery({ name: 'max_wait', required: false })
  async checkout(
    @Body() user: User,
    @Query('max_wait', new DefaultValuePipe(0), new ParseIntPipe())
    maxWait: number
  ): Promise<string> {
    if (maxWait == 0) {
      await this.watcherService.checkout(user);
    } else {
      randWait(maxWait).then(() => {
        this.watcherService.checkout(user);
      });
    }

    return `Great Success`;
  }
}
