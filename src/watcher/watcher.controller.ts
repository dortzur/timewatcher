import { Controller, Get } from '@nestjs/common';
import { WatcherService } from './watcher.service';

@Controller('watcher')
export class WatcherController {
  constructor(private readonly appService: WatcherService) {}

  @Get()
  async index(): Promise<string> {
    return 'hello';
  }
}
