import { Module } from '@nestjs/common';
import { WatcherController } from './watcher.controller';
import { WatcherService } from './watcher.service';
import { WatcherClient } from './watcher.client';

@Module({
  controllers: [WatcherController],
  providers: [WatcherService, WatcherClient],
})
export class WatcherModule {}
