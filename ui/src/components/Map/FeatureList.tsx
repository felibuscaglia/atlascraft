import { TEXT_COLOR } from "lib/constants/styles";
import { MoreVertical } from "react-feather";

const MapFeatureList = () => {
  return (
    <div className="fixed left-8 top-8 z-50 w-[21.7%] rounded-sm bg-white">
      <div className="p-4">
        <section className="flex items-center justify-between">
          <h1 className="mb-1 text-xl font-semibold">Unnamed map</h1>
          <button>
            <MoreVertical color={TEXT_COLOR} size={20} />
          </button>
        </section>
        <p className="text-sm opacity-70">2 views</p>
        <p className="text-sm opacity-70">Last change was made 2 hours ago</p>
      </div>
    </div>
  );
};

export default MapFeatureList;
