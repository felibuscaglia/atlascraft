import { PLACE_TYPE } from "lib/enum";

export interface IPlace {
  id: string;
  externalId: string;
  displayName: string;
  name: string;
  latitude: number;
  longitude: number;
  type: PLACE_TYPE;
}