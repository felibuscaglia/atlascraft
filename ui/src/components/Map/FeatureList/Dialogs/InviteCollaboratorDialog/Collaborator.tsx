import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import { IUser } from "lib/interfaces/entities";
import { useState } from "react";
import { Check, IconProps, Trash, X } from "react-feather";

const iconProps: IconProps = {
  strokeWidth: 1,
  size: 18,
  color: PRIMARY_BRAND_COLOR,
};

interface IProps {
  collaborator: IUser;
}

const InviteCollaboratorDialogCollaborator: React.FC<IProps> = ({
  collaborator,
}) => {
  const [confirmDelete, setConfirmDelete] = useState(false);
  return (
    <div className="flex items-center justify-between">
      <section className="flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-brand-color">
          <h6 className="text-lg font-bold text-secondary-brand-color">
            {collaborator.fullName[0]}
          </h6>
        </div>
        <h5>{collaborator.fullName}</h5>
      </section>
      {!confirmDelete ? (
        <button onClick={() => setConfirmDelete(true)}>
          <Trash {...iconProps} />
        </button>
      ) : (
        <div className="flex items-center gap-2">
          <button>
            <Check {...iconProps} />
          </button>
          <button onClick={() => setConfirmDelete(false)}>
            <X {...iconProps} />
          </button>
        </div>
      )}
    </div>
  );
};

export default InviteCollaboratorDialogCollaborator;
