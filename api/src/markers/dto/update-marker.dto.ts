import { IsHexColor, IsOptional } from "class-validator";

export class UpdateMarkerDto {
  @IsOptional()
  @IsHexColor()
  color?: string;
}
