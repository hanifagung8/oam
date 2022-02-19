export class LoginRequestDto {
  email: string;
  hashedPassword: string;
}

export class LoginResponseDto {
  jwtToken: string;
}

export class RegisterRequestDto {
  email: string;
  hashedPassword: string;
  fullName: string;
}

export class RegisterResponseDto {
  jwtToken: string;
}