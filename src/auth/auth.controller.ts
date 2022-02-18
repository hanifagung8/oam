import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { LoginRequestDto } from "./auth.dto";
import { AuthAPITokenGuard, JWTGuard } from "./auth.guard";
import { AccountJwtPayload } from "./auth.model";
import { AuthService } from "./auth.service";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @UseGuards(AuthAPITokenGuard)
  @Post('login')
  async login(@Body() loginRequestDto: LoginRequestDto): Promise<string> {
    const jwtPayload: AccountJwtPayload = {
      accountGuid: loginRequestDto.email
    };


    const jwtToken: string = this.authService.generateJwtToken(jwtPayload);

    return jwtToken;
  }

  @UseGuards(JWTGuard)
  @Get('tesJwt')
  async tesJwt(): Promise<string> {
    return 'wl';
  }
}