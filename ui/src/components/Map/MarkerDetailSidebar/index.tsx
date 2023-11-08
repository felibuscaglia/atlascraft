import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { IMarker } from "lib/interfaces/entities";
import { X } from "react-feather";

interface IMapMarkerDetailSidebarProps {
  marker: IMarker;
  onClose: () => void;
}

const MapMarkerDetailSidebar: React.FC<IMapMarkerDetailSidebarProps> = ({ marker, onClose }) => {
  const { place } = marker;
  return (
    <div className="fixed right-0 z-50 flex h-full w-[26%] flex-col bg-secondary-brand-color p-4">
      <button onClick={onClose} className="self-end pr-2">
        <X color={PRIMARY_BRAND_COLOR} />
      </button>
      <h2 className="text-center text-3xl">
        {marker.customDisplayName || place.displayName}
      </h2>
      <span className="text-center text-lg opacity-70">{place.name}</span>
    </div>
  );
};

export default MapMarkerDetailSidebar;
