import { Controller, Get, Redirect } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Redirect('/api')
  index(): void {}
  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
