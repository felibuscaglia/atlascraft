import { ILayer } from "lib/interfaces/entities";
import { Eye } from "react-feather";
import Marker from "./Marker";

interface IProps {
  layer: ILayer;
  selected: boolean;
}

const MapFeatureListLayer: React.FC<IProps> = ({ layer, selected }) => {
  return (
    <div
      className={`border-l-4 ${
        selected ? "border-l-primary-brand-color" : "border-l-transparent"
      }`}
    >
      <section className="flex items-center justify-between px-3 pt-4">
        <h6 className="text-sm font-bold">{layer.name}</h6>
        <button>
          <Eye size={14} />
        </button>
      </section>
      {layer.markers.length ? (
        <section className="divide-y-primary-brand-color divide-y">
          {layer.markers.map((marker) => (
            <Marker
              {...marker}
              key={`map-feature-list-layer-marker-${marker.id}`}
            />
          ))}
        </section>
      ) : (
        <p className="py-4 text-center">No markers available.</p>
      )}
    </div>
  );
};

export default MapFeatureListLayer;
