import { Module } from '@nestjs/common';
import { AccountModule } from 'src/account/account.module';
import { AuthController } from './auth.controller';
import { AuthApiTokenGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Module({
  providers: [AuthService, AuthApiTokenGuard, AuthController],
  exports: [AuthService, AuthApiTokenGuard, AuthController],
  imports: [AccountModule]
})
export class AuthModule { }
