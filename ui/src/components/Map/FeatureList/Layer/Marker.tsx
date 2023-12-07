import { MapContext } from "lib/contexts";
import { IMarker } from "lib/interfaces/entities";
import { useContext, useState } from "react";
import { Edit, MapPin } from "react-feather";
import EditMarkerDialog from "../Dialogs/EditMarkerDialog";

const ICON_SIZE = 14;

interface IProps {
  marker: IMarker;
  layerId: string;
}

const MapFeatureListLayerMarker: React.FC<IProps> = ({ marker, layerId }) => {
  const [displayEditMarkerDialog, setDisplayMarkerDialog] = useState(false);
  const { openMarkerDetailSidebar } = useContext(MapContext);

  return (
    <>
      <div className="flex items-center justify-between px-3 py-4">
        <section className="flex items-center gap-2">
          <MapPin size={ICON_SIZE} />
          <span className="text-sm">
            {marker.customDisplayName || marker.place.displayName}
          </span>
        </section>
        <section className="flex items-center gap-2">
          <button
            onClick={() => setDisplayMarkerDialog(true)}
            className="rounded-full border-2 border-neutral-400 p-px"
          >
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: marker.color }}
            />
          </button>
          <button onClick={() => openMarkerDetailSidebar(marker)}>
            <Edit size={ICON_SIZE} />
          </button>
        </section>
      </div>
      <EditMarkerDialog
        display={displayEditMarkerDialog}
        onClose={() => setDisplayMarkerDialog(false)}
        marker={marker}
        layerId={layerId}
      />
    </>
  );
};

export default MapFeatureListLayerMarker;
