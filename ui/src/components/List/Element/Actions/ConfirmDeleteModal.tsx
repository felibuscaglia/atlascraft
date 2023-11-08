import { Dialog, Transition } from "@headlessui/react";
import DialogLayout from "layouts/Dialog";
import { API_PATHS } from "lib/constants/paths";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { Fragment, useState } from "react";
import { ClipLoader } from "react-spinners";

interface IListElementActionsConfirmDeleteModalProps {
  display: boolean;
  onClose: () => void;
  mapId: string;
  onDeleteConfirm: () => void;
}

const ListElementActionsConfirmDeleteModal: React.FC<
  IListElementActionsConfirmDeleteModalProps
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

export default ListElementActionsConfirmDeleteModal;
