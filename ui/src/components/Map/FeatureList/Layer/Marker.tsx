import { IMarker } from "lib/interfaces/entities";
import { Edit, MapPin } from "react-feather";

const ICON_SIZE = 14;

const MapFeatureListLayerMarker: React.FC<IMarker> = ({
  customDisplayName,
  place,
}) => {
  return (
    <div className="px-3 py-4 flex items-center justify-between">
      <section className="flex items-center gap-2">
        <MapPin size={ICON_SIZE} />
        <span className="text-sm">
          {customDisplayName || place.displayName}
        </span>
      </section>
      <button>
        <Edit size={ICON_SIZE} />
      </button>
    </div>
  );
};

export default MapFeatureListLayerMarker;
