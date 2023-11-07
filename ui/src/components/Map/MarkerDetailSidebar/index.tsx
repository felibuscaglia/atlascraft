import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { X } from "react-feather";

const MapMarkerDetailSidebar = () => {
  return (
    <div className="fixed right-0 z-50 flex h-full w-[26%] flex-col bg-secondary-brand-color p-4">
      <button className="self-end pr-2">
        <X color={PRIMARY_BRAND_COLOR} />
      </button>
    </div>
  );
};

export default MapMarkerDetailSidebar;
