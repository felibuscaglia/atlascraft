import { ILayer } from "lib/interfaces/entities";
import { Eye } from "react-feather";
import Marker from "./Marker";

const MapFeatureListLayer: React.FC<ILayer> = ({ name, markers }) => {
  return (
    <div className="border-l-4 border-l-primary-brand-color">
      <section className="flex items-center justify-between px-3 pt-4">
        <h6 className="text-sm font-bold">{name}</h6>
        <button>
          <Eye size={14} />
        </button>
      </section>
      <section className="divide-y divide-y-primary-brand-color">
        {markers.map((marker) => (
          <Marker
            {...marker}
            key={`map-feature-list-layer-marker-${marker.id}`}
          />
        ))}
      </section>
    </div>
  );
};

export default MapFeatureListLayer;
