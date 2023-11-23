import { IsOptional, IsString } from "class-validator";

export class PatchLayerDto {
  @IsOptional()
  @IsString()
  name?: string;
}