import { IsEmail, IsUUID } from 'class-validator';
import { CUSTOM_EMAIL_ERROR_MESSAGE } from 'lib/constants';

export class InviteColaboratorDto {
  @IsUUID()
  mapId: string;

  @IsEmail({}, { message: CUSTOM_EMAIL_ERROR_MESSAGE })
  email: string;
}
