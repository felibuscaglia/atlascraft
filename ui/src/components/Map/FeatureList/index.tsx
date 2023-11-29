import { ILayer, IMap } from "lib/interfaces/entities";
import Actions from "./Actions";
import Layer from "./Layer";
import Options from "./Options";
import EditMapDetailsDialog from "./Dialogs/EditMapDetailsDialog";
import { useState, useContext } from "react";
import InviteCollaboratorDialog from "./Dialogs/InviteCollaboratorDialog";
import { Eye, Layers, UserPlus } from "react-feather";
import { ClipLoader } from "react-spinners";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";
import ShareMapDialog from "./Dialogs/ShareMapDialog";

interface IDialogDisplay {
  mapDetails: boolean;
  inviteCollaborator: boolean;
  shareMap: boolean;
}

interface IMapFeatureList {
  map: IMap;
  selectedLayerIndex: number;
  setSelectedLayerIndex: React.Dispatch<React.SetStateAction<number>>;
}

const MapFeatureList: React.FC<IMapFeatureList> = ({
  map,
  selectedLayerIndex,
  setSelectedLayerIndex,
}) => {
  const [displayDialog, setDisplayDialog] = useState<IDialogDisplay>({
    mapDetails: false,
    inviteCollaborator: false,
    shareMap: false,
  });
  const [creatingLayer, setCreatingLayer] = useState(false);

  const { setMap } = useContext(MapContext);

  const axiosAuth = useAxiosAuth();

  const toggleDialog = (key: keyof IDialogDisplay, open = true) => {
    setDisplayDialog({
      ...displayDialog,
      [key]: open,
    });
  };

  const createLayer = () => {
    setCreatingLayer(true);

    const path = API_PATHS.CREATE_LAYER.replace(":mapId", map.id);

    axiosAuth
      .post<ILayer>(path)
      .then(({ data: newLayer }) => {
        setMap({
          ...map,
          layers: [...map.layers, newLayer],
        });
        setCreatingLayer(false);
      })
      .catch((err) => console.error(err));
  };

  const actions = [
    { text: "Add layer", icon: Layers, onClick: createLayer },
    {
      text: "Share",
      icon: UserPlus,
      onClick: () => setDisplayDialog({ ...displayDialog, shareMap: true }),
    },
    { text: "Preview", icon: Eye, onClick: () => {} },
  ];

  return (
    <>
      <div className="fixed left-3 top-20 z-40 w-[21.7%] rounded-sm bg-secondary-brand-color">
        <div className="py-4 pl-4 pr-2">
          <section className="flex items-center justify-between">
            <h1
              onClick={() => toggleDialog("mapDetails")}
              className="mb-1 cursor-pointer text-xl font-semibold"
            >
              {map.name}
            </h1>
            <Options
              displayEditMapDetailsDialog={() => toggleDialog("mapDetails")}
              displayInviteCollaboratorDialog={() =>
                toggleDialog("inviteCollaborator")
              }
            />
          </section>
          {creatingLayer && (
            <ClipLoader
              size={14}
              className="mt-2"
              color={PRIMARY_BRAND_COLOR}
            />
          )}
        </div>
        <Actions actions={actions} />
        <div>
          {map.layers.map((layer, i) => (
            <Layer
              layer={layer}
              selected={i === selectedLayerIndex}
              updateLayerIndex={() => setSelectedLayerIndex(i)}
              key={`layer-${layer.id}`}
            />
          ))}
        </div>
      </div>
      <EditMapDetailsDialog
        display={displayDialog.mapDetails}
        onClose={() => toggleDialog("mapDetails", false)}
        map={map}
      />
      <InviteCollaboratorDialog
        onClose={() => toggleDialog("mapDetails", false)}
        display={displayDialog.inviteCollaborator}
        collaborators={map.users}
        mapId={map.id}
      />
      <ShareMapDialog
        display={displayDialog.shareMap}
        onClose={() => toggleDialog("shareMap")}
        mapId={map.id}
      />
    </>
  );
};

export default MapFeatureList;
