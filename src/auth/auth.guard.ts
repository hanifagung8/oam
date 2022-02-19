import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Jwt, JwtPayload, verify } from "jsonwebtoken";
import { catchError, Observable } from "rxjs";
import { AccountEntity } from "src/account/account.entity";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthApiTokenGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) { }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const authHeaderExists: boolean = this.authService.authHeaderExists(context);
    if (!authHeaderExists) {
      return false;
    }

    const bearerToken: string = this.authService.getBearerTokenFromHeader(context);
    return bearerToken == process.env.ApiToken;
  }

}

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
  ) { }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const authHeaderExists: boolean = this.authService.authHeaderExists(context);
    if (!authHeaderExists) {
      return false;
    }

    const bearerToken: string = this.authService.getBearerTokenFromHeader(context);

    var jwtPayload: JwtPayload;

    try {
      jwtPayload = verify(bearerToken, "secret") as JwtPayload;
    } catch (error) {
      return false;
    }


    const request = context.switchToHttp().getRequest();
    request.accountUuid = jwtPayload?.uuid;

    return true;
  }
}