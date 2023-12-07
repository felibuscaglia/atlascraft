import { IsHexColor, IsOptional, IsString } from 'class-validator';

export class UpdateMarkerDto {
  @IsOptional()
  @IsHexColor()
  color?: string;

  @IsOptional()
  @IsString()
  customDisplayName?: string;
}
