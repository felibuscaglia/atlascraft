import { ILayer } from "lib/interfaces/entities";
import Actions from "./Actions";
import Layer from "./Layer";
import Options from "./Options";

interface IMapFeatureList {
  mapName: string;
  layers: ILayer[];
}

const MapFeatureList: React.FC<IMapFeatureList> = ({ mapName, layers }) => {
  return (
    <div className="fixed left-3 top-20 z-50 w-[21.7%] rounded-sm bg-secondary-brand-color">
      <div className="py-4 pl-4 pr-1">
        <section className="flex items-center justify-between">
          <h1 className="mb-1 text-xl font-semibold">{mapName}</h1>
          <Options />
        </section>
        <p className="text-sm opacity-70">2 views</p>
        <p className="text-sm opacity-70">Last change was made 2 hours ago</p>
      </div>
      <Actions />
      <div>
        {layers.map((layer) => <Layer {...layer} key={`layer-${layer.id}`} />)}
      </div>
    </div>
  );
};

export default MapFeatureList;
