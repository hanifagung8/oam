import { Body, Controller, Get, Post, Req, Request, UseGuards } from "@nestjs/common";
import { AccountEntity } from "src/account/account.entity";
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from "./auth.dto";
import { AuthApiTokenGuard, JWTGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthApiTokenGuard)
  @Post('login')
  login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const res = this.authService.login(loginRequestDto);
    return res;
  }

  @UseGuards(AuthApiTokenGuard)
  @Post('register')
  register(@Body() registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    const res = this.authService.register(registerRequestDto);
    return res;
  }
}