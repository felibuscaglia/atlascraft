import { IsDefined, IsNotEmpty, IsString, IsLatitude, IsLongitude, IsUUID } from "class-validator";

export class SaveMarkerDto {
  @IsDefined()
  @IsLatitude()
  latitude: number;
  
  @IsDefined()
  @IsLongitude()
  longitude: number;

  @IsNotEmpty()
  @IsString()
  displayName: string;
  
  @IsNotEmpty()
  @IsString()
  name: string;
  
  @IsNotEmpty()
  @IsString()
  externalId: string;

  @IsNotEmpty()
  @IsUUID()
  mapId: string;
}
