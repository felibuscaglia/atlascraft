import DialogLayout from "layouts/Dialog";
import { UNEXPECTED_ERROR_MSG } from "lib/constants/error-messages";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IMap, IUser } from "lib/interfaces/entities";
import { useState, useContext } from "react";
import Collaborator from "./Collaborator";

interface IProps {
  display: boolean;
  onClose: () => void;
  collaborators: IUser[];
  mapId: string;
}

const MapFeatureListInviteCollaboratorDialog: React.FC<IProps> = ({
  display,
  onClose,
  collaborators = [],
  mapId,
}) => {
  const [input, setInput] = useState("");
  const [invitingCollaborator, setInvitingCollaborator] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const axiosAuth = useAxiosAuth();

  const { setMap } = useContext(MapContext);

  const inviteCollaborator = () => {
    setInvitingCollaborator(true);

    if (error) {
      setError(null);
    }

    axiosAuth
      .post<IMap>(API_PATHS.INVITE_COLLABORATOR, { mapId, email: input.trim() })
      .then(({ data: updatedMap }) => {
        setInvitingCollaborator(false);
        setMap(updatedMap);
      })
      .catch((err) => {
        setError(err.response?.data?.message ?? UNEXPECTED_ERROR_MSG);
        setInvitingCollaborator(false);
      });
  };

  return (
    <DialogLayout
      title="Invite a collaborator to this map"
      onDialogClose={onClose}
      display={display}
      performingAction={invitingCollaborator}
      onButtonClick={inviteCollaborator}
      btnText="Invite"
      color="brand"
      error={error || undefined}
    >
      <div className="my-4 w-full rounded-sm bg-neutral-200 p-2">
        <input
          className="w-full bg-transparent text-base"
          placeholder="Add collaborators"
          value={input}
          onChange={({ target }) => setInput(target.value)}
        />
      </div>
      <ul className="flex flex-col gap-4">
        {collaborators.map((collaborator) => (
          <li key={`collaborator-${collaborator.id}`}>
            <Collaborator collaborator={collaborator} />
          </li>
        ))}
      </ul>
    </DialogLayout>
  );
};

export default MapFeatureListInviteCollaboratorDialog;
