// src/auth/dto/auth.dto.ts
import { IsEmail, Matches, IsNotEmpty } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/, {
    message: 'Password must be at least 8 characters long, contain one uppercase letter and one number',
  })
  password: string;
}
