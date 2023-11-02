import { IMarker } from "lib/interfaces/entities";
import { MapPin } from "react-feather";

const MapFeatureListLayerMarker: React.FC<IMarker> = ({
  customDisplayName,
  place,
}) => {
  return (
    <div className="px-3 py-4">
      <section className="flex items-center gap-2">
        <MapPin size={14} />
        <span className="text-sm">{customDisplayName || place.displayName}</span>
      </section>
    </div>
  );
};

export default MapFeatureListLayerMarker;
