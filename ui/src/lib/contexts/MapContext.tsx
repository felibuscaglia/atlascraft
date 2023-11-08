import { IMarker } from "lib/interfaces/entities";
import { createContext } from "react";

interface IMapContext {
  openMarkerDetailSidebar: (marker: IMarker) => void;
}

export const MapContext = createContext<IMapContext>({
  openMarkerDetailSidebar: () => {},
});
