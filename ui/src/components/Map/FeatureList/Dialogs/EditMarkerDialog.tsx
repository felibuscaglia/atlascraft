import Input from "components/Input";
import DialogLayout from "layouts/Dialog";
import { UNEXPECTED_ERROR_MSG } from "lib/constants/error-messages";
import { API_PATHS } from "lib/constants/paths";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { MapContext } from "lib/contexts";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { ILayer, IMarker } from "lib/interfaces/entities";
import { useState, useContext } from "react";
import { TwitterPicker } from "react-color";
import toast from "react-hot-toast";

interface IProps {
  display: boolean;
  onClose: () => void;
  marker: IMarker;
  layerId: string;
}

const EditMarkerDialog: React.FC<IProps> = ({
  display,
  onClose,
  marker,
  layerId,
}) => {
  const [input, setInput] = useState({
    color: marker.color,
    customDisplayName: marker.customDisplayName,
  });
  const [isUpdatingMarker, setIsUpdatingMarker] = useState(false);

  const { map, setMap } = useContext(MapContext);

  const axiosAuth = useAxiosAuth();

  const handleSubmit = () => {
    setIsUpdatingMarker(true);

    const path = API_PATHS.UPDATE_MARKER.replace(
      ":markerId",
      marker.id,
    ).replace(":mapId", map.id);

    axiosAuth
      .patch<IMarker>(path, input)
      .then(({ data: updatedMarker }) => {
        const updatedLayers = map.layers.map<ILayer>((l) =>
          l.id === layerId
            ? {
                ...l,
                markers: l.markers.map((m) =>
                  m.id === marker.id ? { ...m, ...updatedMarker } : m,
                ),
              }
            : l,
        );

        setMap({
          ...map,
          layers: updatedLayers,
        });

        setIsUpdatingMarker(false);
        onClose();
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MSG);
        setIsUpdatingMarker(false);
      });
  };

  return (
    <DialogLayout
      display={display}
      onDialogClose={onClose}
      title="Edit marker details"
      color="brand"
      btnText="Save"
      onButtonClick={handleSubmit}
      performingAction={isUpdatingMarker}
    >
      <Input
        id="customDisplayName"
        label="Display name"
        value={input.customDisplayName || ""}
        onChange={(e) =>
          setInput({ ...input, customDisplayName: e.target.value })
        }
      />
      <span className="mt-4 block">Color</span>
      <TwitterPicker
        triangle="hide"
        color={input.color}
        onChange={(e) => setInput({ ...input, color: e.hex })}
        colors={[
          "#FF6900",
          "#FCB900",
          "#7BDCB5",
          "#00D084",
          "#8ED1FC",
          "#0693E3",
          "#ABB8C3",
          "#EB144C",
          "#F78DA7",
          PRIMARY_BRAND_COLOR,
        ]}
      />
    </DialogLayout>
  );
};

export default EditMarkerDialog;
