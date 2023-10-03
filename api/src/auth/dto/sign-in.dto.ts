import { IsDefined, IsString, IsEmail } from 'class-validator';

export class SignInDto {
  @IsDefined()
  @IsString()
  @IsEmail()
  email: string;

  @IsDefined()
  @IsString()
  password: string;
}
