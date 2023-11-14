import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsLatitude,
  IsLongitude,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { PLACE_TYPE } from 'places/lib/enums';

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

  @IsNotEmpty()
  @IsUUID()
  layerId: string;

  @IsNotEmpty()
  @IsEnum(PLACE_TYPE)
  type: PLACE_TYPE;
}
