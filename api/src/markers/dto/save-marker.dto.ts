import {
  IsDefined,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsEnum,
} from 'class-validator';
import { PLACE_TYPE } from 'places/lib/enums';

export class SaveMarkerDto {
  @IsDefined()
  latitude: number;

  @IsDefined()
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
