export class LoginRequestDto {
  email: string;
  hashedPassword: string;
}

export class LoginResponseDto {
  jwtToken: string;
}