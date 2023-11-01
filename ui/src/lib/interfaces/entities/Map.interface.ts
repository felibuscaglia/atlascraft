import { IMarker } from "./Marker.interface";

export interface IMap {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  markers: IMarker[];
}
