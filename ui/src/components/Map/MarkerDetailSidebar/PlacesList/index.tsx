import { MapPin } from "react-feather";
import Disclosure from "../Disclosure";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { PLACE_TYPE } from "lib/enum";

interface IProps {
  type: PLACE_TYPE;
  buttonText: string;
}

const MarkerDetailsSidebarPlacesList: React.FC<IProps> = ({ type, buttonText }) => {
  return (
    <Disclosure buttonText={buttonText}>
      <div className="flex w-11/12 items-center gap-2 bg-neutral-200 p-2">
        <MapPin size={18} color={PRIMARY_BRAND_COLOR} />
        <input
          className="w-full bg-transparent text-base"
          placeholder={`Add a ${type}`}
        />
      </div>
    </Disclosure>
  );
};

export default MarkerDetailsSidebarPlacesList;
