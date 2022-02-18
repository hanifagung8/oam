import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AccountModule } from './account/account.module';
import { AuthController } from './auth/auth.controller';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, AccountModule],
  controllers: [AppController, AuthController],
  providers: [AppService],
})
export class AppModule { }
