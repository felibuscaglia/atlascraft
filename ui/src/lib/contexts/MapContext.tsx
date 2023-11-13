import { IMap, IMarker } from "lib/interfaces/entities";
import { createContext } from "react";

interface IMapContext {
  openMarkerDetailSidebar: (marker: IMarker) => void;
  setMap: React.Dispatch<React.SetStateAction<IMap | null>>;
}

export const MapContext = createContext<IMapContext>({
  openMarkerDetailSidebar: () => {},
  setMap: () => {},
});
