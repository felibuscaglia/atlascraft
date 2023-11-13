import DialogLayout from "layouts/Dialog";
import { API_PATHS } from "lib/constants/paths";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { useState } from "react";

interface IListElementActionsConfirmDeleteDialogProps {
  display: boolean;
  onClose: () => void;
  mapId: string;
  onDeleteConfirm: () => void;
}

const ListElementActionsConfirmDeleteDialog: React.FC<
IListElementActionsConfirmDeleteDialogProps
> = ({ display, onClose, mapId, onDeleteConfirm }) => {
  const [deleting, setDeleting] = useState(false);

  const axiosAuth = useAxiosAuth();

  const deleteMap = () => {
    setDeleting(true);

    axiosAuth
      .delete(API_PATHS.DELETE_MAP.replace(":mapId", mapId))
      .then(() => {
        onDeleteConfirm();
        setDeleting(false);
        onClose();
      })
      .catch((err) => console.error(err));
  };

  return (
    <DialogLayout
      display={display}
      performingAction={deleting}
      onDialogClose={onClose}
      onButtonClick={deleteMap}
      title="Are you sure you want to delete this map?"
      btnText="I'm sure. Delete."
      color="danger"
    >
      <div className="mt-2">
        <p className="text-sm opacity-70">
          Please be aware that deleting this map is an irreversible action. Once
          deleted, all map data and settings will be permanently lost, and there
          is no way to recover it.
        </p>
      </div>
    </DialogLayout>
  );
};

export default ListElementActionsConfirmDeleteDialog;
