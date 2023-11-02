import { Dialog, Transition } from "@headlessui/react";
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
    <Transition appear show={display || deleting} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-lg font-medium leading-6">
                  Are you sure you want to delete this map?
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm opacity-70">
                    Please be aware that deleting this map is an irreversible
                    action. Once deleted, all map data and settings will be
                    permanently lost, and there is no way to recover it.
                  </p>
                </div>

                <div className="mt-4 flex items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                    onClick={deleteMap}
                  >
                    {deleting ? (
                      <ClipLoader size={10} color={PRIMARY_BRAND_COLOR} />
                    ) : (
                      <span>I'm sure. Delete.</span>
                    )}
                  </button>
                  <button
                    disabled={deleting}
                    onClick={onClose}
                    className="text-sm font-medium hover:underline"
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ListElementActionsConfirmDeleteModal;
