import { IMap } from "./Map.interface";
import { IMarker } from "./Marker.interface";

export interface ILayer {
    id: string;
    name: string;
    markers: IMarker[];
    map: IMap;
}