import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthAPITokenGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
  ) { }

  @Get()
  @UseGuards(AuthAPITokenGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
