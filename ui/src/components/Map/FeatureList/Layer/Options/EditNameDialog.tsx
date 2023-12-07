import Input from "components/Input";
import DialogLayout from "layouts/Dialog";
import { UNEXPECTED_ERROR_MSG } from "lib/constants/error-messages";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { ILayer } from "lib/interfaces/entities";
import { useContext, useState } from "react";

interface IProps {
  display: boolean;
  layer: ILayer;
  onClose: () => void;
}

const OptionsEditNameDialog: React.FC<IProps> = ({
  display,
  layer,
  onClose,
}) => {
  const [editingName, setEditingName] = useState(false);
  const [layerName, setLayerName] = useState(layer.name);
  const [error, setError] = useState<string | string[] | null>(null);

  const { setMap, map } = useContext(MapContext);

  const axiosAuth = useAxiosAuth();

  const editLayerName = () => {
    setEditingName(true);

    const path = API_PATHS.PATCH_LAYER.replace(":layerId", layer.id).replace(
      ":mapId",
      map.id,
    );

    axiosAuth
      .patch<ILayer>(path, { name: layerName })
      .then(({ data: updatedLayer }) => {
        const updatedLayers = [...map.layers];
        const layerToUpdateIndex = updatedLayers.findIndex(
          (l) => l.id === updatedLayer.id,
        );
        updatedLayers[layerToUpdateIndex] = { ...layer, ...updatedLayer };

        setMap({
          ...map,
          layers: updatedLayers,
        });

        setEditingName(false);
        onClose();
      })
      .catch((err) => {
        const errorMessages: string[] = err.response?.data?.message;

        setError(errorMessages.length ? errorMessages : UNEXPECTED_ERROR_MSG);
        setEditingName(false);
      });
  };

  return (
    <DialogLayout
      display={display}
      performingAction={editingName}
      onDialogClose={onClose}
      onButtonClick={editLayerName}
      title="Change layer name"
      btnText="Edit"
      color="brand"
      error={error || undefined}
    >
      <Input
        id="name"
        label="Layer name"
        value={layerName}
        onChange={({ target }) => setLayerName(target.value)}
      />
    </DialogLayout>
  );
};

export default OptionsEditNameDialog;
