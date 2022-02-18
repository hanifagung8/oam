import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Jwt, JwtPayload, verify } from "jsonwebtoken";
import { catchError, Observable } from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthAPITokenGuard implements CanActivate {
  constructor(
    private readonly appService: AuthService,
  ) { }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    return this.appService.authHeaderExists(context);
  }

}

@Injectable()
export class JWTGuard implements CanActivate {
  constructor(
    private readonly appService: AuthService,
  ) { }


  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const authHeaderExists: boolean = this.appService.authHeaderExists(context);
    if (!authHeaderExists) {
      return false;
    }

    const bearerToken: string = this.appService.getBearerTokenFromHeader(context);

    var jwtPayload: JwtPayload;

    try {
      jwtPayload = verify(bearerToken, "secret") as JwtPayload;
    } catch (error) {
      return false;
    }

    return true;
  }
}