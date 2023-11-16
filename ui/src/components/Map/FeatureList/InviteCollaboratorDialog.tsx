import DialogLayout from "layouts/Dialog";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IUser } from "lib/interfaces/entities";
import { useState } from "react";

interface IProps {
  display: boolean;
  onClose: () => void;
  collaborators: IUser[];
}

const MapFeatureListInviteCollaboratorDialog: React.FC<IProps> = ({
  display,
  onClose,
  collaborators = [],
}) => {
  const [input, setInput] = useState("");
  const [invitingCollaborator, setInvitingCollaborator] = useState(false);

  const axiosAuth = useAxiosAuth();

  const inviteCollaborator = () => {};

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      inviteCollaborator();
    }
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
    >
      <input
        className="w-full rounded-sm bg-neutral-200 p-2 text-base"
        placeholder="Add collaborators"
        value={input}
        onChange={({ target }) => setInput(target.value)}
        onKeyDown={handleKeyDown}
      />
    </DialogLayout>
  );
};

export default MapFeatureListInviteCollaboratorDialog;
