import { Switch } from "@headlessui/react";
import LinkCopier from "components/LinkCopier";
import DialogLayout from "layouts/Dialog";
import { UNEXPECTED_ERROR_MSG } from "lib/constants/error-messages";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IMap } from "lib/interfaces/entities";
import { useContext, useState } from "react";
import toast from "react-hot-toast";

interface IProps {
  display: boolean;
  onClose: () => void;
  map: IMap;
}

const ShareMapDialog: React.FC<IProps> = ({ display, onClose, map }) => {
  const [isPublic, setIsPublic] = useState(map.isPublic);
  const [isUpdating, setIsUpdating] = useState(false);

  const axiosAuth = useAxiosAuth();

  const { setMap } = useContext(MapContext);

  const handleToggleSwitch = () => {
    setIsPublic(!isPublic);
    setIsUpdating(true);

    axiosAuth
      .patch<IMap>(API_PATHS.UPDATE_MAP.replace(":mapId", map.id), {
        isPublic: !isPublic,
      })
      .then(({ data: updatedMap }) => {
        setMap({
          ...map,
          ...updatedMap,
        });
        setIsUpdating(false);
      })
      .catch((err) => {
        toast.error(UNEXPECTED_ERROR_MSG);
        setIsUpdating(false);
      });
  };

  return (
    <DialogLayout
      display={display}
      onDialogClose={onClose}
      title="Share map"
      color="brand"
    >
      <LinkCopier url={UI_PATHS.VIEW_MAP.replace(":mapId", map.id)} />
      <div className="mt-4 flex items-center gap-2">
        <Switch
          checked={isPublic}
          disabled={isUpdating}
          onChange={handleToggleSwitch}
          className={`${
            isPublic ? "bg-primary-brand-color" : "bg-neutral-300"
          } ${
            isUpdating ? "opacity-50" : "opcaity-100"
          } relative inline-flex h-6 w-11 items-center rounded-full disabled:cursor-not-allowed`}
        >
          <span
            className={`${
              isPublic ? "translate-x-6" : "translate-x-1"
            } inline-block h-4 w-4 transform rounded-full bg-white transition`}
          />
        </Switch>
        <label>Accesible to anyone with the link</label>
      </div>
    </DialogLayout>
  );
};

export default ShareMapDialog;
