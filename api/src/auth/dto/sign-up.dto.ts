import { IsNotEmpty, IsString, IsEmail } from 'class-validator';
import { CUSTOM_EMAIL_ERROR_MESSAGE } from 'lib/constants';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail({}, { message: CUSTOM_EMAIL_ERROR_MESSAGE })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
