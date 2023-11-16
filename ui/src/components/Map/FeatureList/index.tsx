import { ILayer, IMap } from "lib/interfaces/entities";
import Actions from "./Actions";
import Layer from "./Layer";
import Options from "./Options";
import EditMapDetailsDialog from "./EditMapDetailsDialog";
import { useState } from "react";
import InviteCollaboratorDialog from "./InviteCollaboratorDialog";

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

  const toggleDialog = (type: "details" | "invite", open = true) => {
    setDisplayDialog({
      ...displayDialog,
      [type === "details" ? "mapDetails" : "inviteCollaborator"]: open,
    });
  };

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
          <p className={textClassnames}>2 views</p>
          <p className={textClassnames}>Last change was made 2 hours ago</p>
        </div>
        <Actions />
        <div>
          {layers.map((layer) => (
            <Layer {...layer} key={`layer-${layer.id}`} />
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
      />
    </>
  );
};

export default MapFeatureList;
