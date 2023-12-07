import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { IMarker } from "lib/interfaces/entities";
import { X } from "react-feather";
import { PLACE_TYPE } from "lib/enum";
import Notepad from "./Notepad";
import PlacesList from "./PlacesList";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import ActionButton from "components/ActionButton";
import { useState, useContext } from "react";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";

interface IMapMarkerDetailSidebarProps {
  marker: IMarker;
  onClose: () => void;
}

const MapMarkerDetailSidebar: React.FC<IMapMarkerDetailSidebarProps> = ({
  marker,
  onClose,
}) => {
  const [removingMarker, setRemovingMarker] = useState(false);
  const { place } = marker;

  const isCountry = place.type === PLACE_TYPE.COUNTRY;

  const { map } = useContext(MapContext);

  const axiosAuth = useAxiosAuth();

  const removeMarker = () => {
    setRemovingMarker(true);

    const path = API_PATHS.DELETE_MARKER.replace(':markerId', marker.id).replace(':mapId', map.id);

    axiosAuth.delete(path)
      .then(() => {})
      .catch(err => {
        
      })
  };

  return (
    <div className="fixed right-0 z-50 h-screen w-[26%] gap-4 bg-secondary-brand-color p-4">
      <button onClick={onClose} className="self-end pr-2">
        <X color={PRIMARY_BRAND_COLOR} />
      </button>
      <section className="flex h-[85.5%] w-full flex-col items-center gap-4 overflow-auto">
        <div>
          <h2 className="text-center text-3xl">
            {marker.customDisplayName || place.displayName}
          </h2>

          {!isCountry && (
            <span className="text-center text-lg opacity-70">{place.name}</span>
          )}
          <div className="flex items-center justify-center">
            <span className="capitalize-first inline-block text-center text-lg font-bold opacity-70">
              {place.type === PLACE_TYPE.POINT_OF_INTEREST
                ? "point of interest"
                : place.type}
            </span>
          </div>
        </div>
        <Notepad />
        <PlacesList buttonText="Regions" type={PLACE_TYPE.REGION} />
      </section>
      <span>Edit marker details</span>
      <ActionButton
        color="danger"
        onClick={removeMarker}
        text="Remove marker"
        fullWidth
        textSize="medium"
        performingAction={removingMarker}
      />
    </div>
  );
};

export default MapMarkerDetailSidebar;
