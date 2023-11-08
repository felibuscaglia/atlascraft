import { MapContext } from "lib/contexts";
import { IMarker } from "lib/interfaces/entities";
import { useContext } from "react";
import { Edit, MapPin } from "react-feather";

const ICON_SIZE = 14;

const MapFeatureListLayerMarker: React.FC<IMarker> = (marker) => {
  const { openMarkerDetailSidebar } = useContext(MapContext);

  return (
    <div className="flex items-center justify-between px-3 py-4">
      <section className="flex items-center gap-2">
        <MapPin size={ICON_SIZE} />
        <span className="text-sm">
          {marker.customDisplayName || marker.place.displayName}
        </span>
      </section>
      <button onClick={() => openMarkerDetailSidebar(marker)}>
        <Edit size={ICON_SIZE} />
      </button>
    </div>
  );
};

export default MapFeatureListLayerMarker;
