import { ILayer, IMap } from "lib/interfaces/entities";
import Actions from "./Actions";
import Layer from "./Layer";
import Options from "./Options";
import EditMapDetailsDialog from "./EditMapDetailsDialog";
import { useState, useContext } from "react";
import InviteCollaboratorDialog from "./InviteCollaboratorDialog";
import { Eye, Layers, UserPlus } from "react-feather";
import { ClipLoader } from "react-spinners";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";

interface IMapFeatureList {
  map: IMap;
  layers: ILayer[];
}

const textClassnames = "text-sm opacity-70";

const MapFeatureList: React.FC<IMapFeatureList> = ({ map, layers }) => {
  const [displayDialog, setDisplayDialog] = useState({
    mapDetails: false,
    inviteCollaborator: false,
  });
  const [performingAction, setPerformingAction] = useState(false);

  const { setMap } = useContext(MapContext);

  const axiosAuth = useAxiosAuth();

  const toggleDialog = (type: "details" | "invite", open = true) => {
    setDisplayDialog({
      ...displayDialog,
      [type === "details" ? "mapDetails" : "inviteCollaborator"]: open,
    });
  };

  const createLayer = () => {
    setPerformingAction(true);

    const path = API_PATHS.CREATE_LAYER.replace(":mapId", map.id);

    axiosAuth
      .post<ILayer>(path)
      .then(({ data: newLayer }) => {
        setMap({
          ...map,
          layers: [...map.layers, newLayer],
        });
        setPerformingAction(false);
      })
      .catch((err) => console.error(err));
  };

  const actions = [
    { text: "Add layer", icon: Layers, onClick: createLayer },
    { text: "Share", icon: UserPlus, onClick: () => {} },
    { text: "Preview", icon: Eye, onClick: () => {} },
  ];

  return (
    <>
      <div className="fixed left-3 top-20 z-40 w-[21.7%] rounded-sm bg-secondary-brand-color">
        <div className="py-4 pl-4 pr-1">
          <section className="flex items-center justify-between">
            <h1
              onClick={() => toggleDialog("details")}
              className="mb-1 cursor-pointer text-xl font-semibold"
            >
              {map.name}
            </h1>
            <Options
              displayEditMapDetailsDialog={() => toggleDialog("details")}
              displayInviteCollaboratorDialog={() => toggleDialog("invite")}
            />
          </section>
          <p className={textClassnames}>
            {map.views} {map.views === 1 ? "view" : "views"}
          </p>
          <section className="flex items-center justify-between">
            <p className={textClassnames}>Last change was made 2 hours ago</p>
            {performingAction && (
              <ClipLoader
                size={10}
                className="mr-1"
                color={PRIMARY_BRAND_COLOR}
              />
            )}
          </section>
        </div>
        <Actions actions={actions} />
        <div>
          {layers.map((layer, i) => (
            <Layer layer={layer} selected key={`layer-${layer.id}`} />
          ))}
        </div>
      </div>
      <EditMapDetailsDialog
        display={displayDialog.mapDetails}
        onClose={() => toggleDialog("details", false)}
        map={map}
      />
      <InviteCollaboratorDialog
        onClose={() => toggleDialog("invite", false)}
        display={displayDialog.inviteCollaborator}
        collaborators={map.users}
        mapId={map.id}
      />
    </>
  );
};

export default MapFeatureList;
