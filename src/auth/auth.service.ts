import { ExecutionContext, Injectable } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { AccountEntity } from 'src/account/account.entity';
import { AccountService } from 'src/account/account.service';
import { LoginRequestDto, LoginResponseDto, RegisterRequestDto, RegisterResponseDto } from './auth.dto';
import { AccountJwtPayload } from './auth.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly accountService: AccountService,
  ) { }

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

  async register(registerRequestDto: RegisterRequestDto): Promise<RegisterResponseDto> {
    var account = new AccountEntity();

    account.email = registerRequestDto.email;
    account.hashedPassword = registerRequestDto.hashedPassword;
    account.fullName = registerRequestDto.fullName;

    const createdAccount: AccountEntity = await this.accountService.createAccount(account);

    const accountJwtPayload: AccountJwtPayload = {
      uuid: createdAccount.uuid,
    }

    const jwtToken: string = this.generateJwtToken(accountJwtPayload);

    const response: RegisterResponseDto = {
      jwtToken: jwtToken,
    }

    return response;
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const account: AccountEntity = await this.accountService.getAccountByEmailAndHashedPassword(
      loginRequestDto.email, loginRequestDto.hashedPassword,
    );

    const accountJwtPayload: AccountJwtPayload = {
      uuid: account.uuid,
    }

    const jwtToken: string = this.generateJwtToken(accountJwtPayload);

    const response: LoginResponseDto = {
      jwtToken: jwtToken,
    }

    return response;
  }
}
