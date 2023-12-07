import { ILayer } from "lib/interfaces/entities";
import Marker from "./Marker";
import Options from "./Options";

interface IProps {
  layer: ILayer;
  selected: boolean;
  updateLayerIndex: () => void;
}

const MapFeatureListLayer: React.FC<IProps> = ({
  layer,
  selected,
  updateLayerIndex,
}) => {
  return (
    <div
      onClick={updateLayerIndex}
      className={`border-b border-l-4 border-b-neutral-200 ${
        selected
          ? "border-l-primary-brand-color"
          : "border-l-transparent hover:border-l-neutral-400"
      }`}
    >
      <section className="flex items-center justify-between px-3 pt-4">
        <h6 className="text-sm font-bold">{layer.name}</h6>
        <Options layer={layer} />
      </section>
      {layer.markers?.length ? (
        <section className="divide-y-primary-brand-color divide-y">
          {layer.markers.map((marker) => (
            <Marker
              marker={marker}
              layerId={layer.id}
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
