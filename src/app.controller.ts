import { Controller, Get, HttpException, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { AccountService } from './account/account.service';
import { AppService } from './app.service';
import { AuthApiTokenGuard } from './auth/auth.guard';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly accountService: AccountService,
  ) { }

  @Get()
  @UseGuards(AuthApiTokenGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
