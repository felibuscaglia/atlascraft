import { IPlace } from "./Place.interface";

export interface IMarker {
  id: string;
  customDisplayName?: string;
  place: IPlace;
}
