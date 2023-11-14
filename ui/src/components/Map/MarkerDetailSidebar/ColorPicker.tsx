import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { SketchPicker } from "react-color";
import { useState } from "react";

interface IMarkerDetailSidebarColorPickerProps {
  color?: string;
}

const MarkerDetailSidebarColorPicker: React.FC<
  IMarkerDetailSidebarColorPickerProps
> = ({ color }) => {
  const [displayPicker, setDisplayPicker] = useState(false);

  return (
    <div className="relative">
      <button onClick={() => setDisplayPicker(!displayPicker)} className="rounded-full border-2 border-neutral-400 p-1">
        <div
          className="h-4 w-4 rounded-full p-1"
          style={{ backgroundColor: color || PRIMARY_BRAND_COLOR }}
        />
      </button>
      {displayPicker && (
        <SketchPicker className="absolute -right-24 top-8 z-50" />
      )}
    </div>
  );
};

export default MarkerDetailSidebarColorPicker;
