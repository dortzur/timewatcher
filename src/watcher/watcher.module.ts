import { Module } from '@nestjs/common';
import { WatcherController } from './watcher.controller';
import { WatcherService } from './watcher.service';

@Module({
  controllers: [WatcherController],
  providers: [WatcherService]
})
export class WatcherModule {}
