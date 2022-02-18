import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthAPITokenGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthAPITokenGuard, AuthController],
  exports: [AuthService, AuthAPITokenGuard, AuthController],
})
export class AuthModule { }
