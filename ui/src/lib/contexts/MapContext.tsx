import { IMarker } from "lib/interfaces/entities";
import { createContext } from "react";

interface IMapContext {
  openMarkerDetailSidebar: (marker: IMarker) => void;
}

export const mapContext = createContext<IMapContext>({
  openMarkerDetailSidebar: () => {},
});
