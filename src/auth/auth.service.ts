import { ExecutionContext, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AccountJwtPayload } from './auth.model';

@Injectable()
export class AuthService {

  generateJwtToken(payload: AccountJwtPayload): string {
    return sign(payload, 'secret');
  }

  authHeaderExists(context: ExecutionContext): boolean {
    const authHeaderArrayMinLength: number = 2;
    const authHeaderArray: string[] = this.getAuthHeaderArray(context);

    return (authHeaderArray?.length ?? 0) >= authHeaderArrayMinLength;
  }

  getAuthHeaderArray(context: ExecutionContext): string[] {
    const authorizationHeaderKey: string = 'Authorization';
    const authorizationHeaderSplitter: string = ' ';

    const headers: Headers = context.switchToHttp().getRequest<Headers>();
    const authHeader: string = headers.get(authorizationHeaderKey);
    const authHeaderArray: string[] = authHeader?.split(authorizationHeaderSplitter);

    return authHeaderArray;
  }

  getBearerTokenFromHeader(context: ExecutionContext): string {
    const bearerTokenIndex: number = 1;
    const authHeaderArray: string[] = this.getAuthHeaderArray(context);

    return authHeaderArray[bearerTokenIndex];
  }
}
