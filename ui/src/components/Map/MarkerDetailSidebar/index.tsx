import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { IMarker } from "lib/interfaces/entities";
import { X } from "react-feather";
import ColorPicker from "./ColorPicker";
import { PLACE_TYPE } from "lib/enum";
import MarkerCreator from "./MarkerCreator";

interface IMapMarkerDetailSidebarProps {
  marker: IMarker;
  onClose: () => void;
}

const MapMarkerDetailSidebar: React.FC<IMapMarkerDetailSidebarProps> = ({
  marker,
  onClose,
}) => {
  const { place } = marker;
  return (
    <div className="fixed right-0 z-50 flex h-full w-[26%] flex-col items-center gap-4 bg-secondary-brand-color p-4">
      <button onClick={onClose} className="self-end pr-2">
        <X color={PRIMARY_BRAND_COLOR} />
      </button>
      <div>
        <section className="flex items-center justify-center gap-2">
          <div className="rounded-full border-2 border-neutral-400 p-px">
            <div
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: marker.color || PRIMARY_BRAND_COLOR }}
            />
          </div>
          <h2 className="text-center text-3xl">
            {marker.customDisplayName || place.displayName}
          </h2>
        </section>
        <p className="text-center text-lg opacity-70">
          <span className="mr-1">{place.name} |</span>
          <span className="capitalize-first inline-block font-bold">
            {place.type === PLACE_TYPE.POINT_OF_INTEREST
              ? "point of interest"
              : place.type}
          </span>
        </p>
      </div>
      <MarkerCreator />
    </div>
  );
};

export default MapMarkerDetailSidebar;
