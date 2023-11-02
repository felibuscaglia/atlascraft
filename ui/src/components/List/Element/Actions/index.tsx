import { Menu, Transition } from "@headlessui/react";
import {
  MENU_BUTTON_CLASSNAMES,
  PRIMARY_BRAND_COLOR,
} from "lib/constants/styles";
import { Fragment, useState } from "react";
import { MoreHorizontal, Trash } from "react-feather";
import ConfirmDeleteModal from "./ConfirmDeleteModal";

interface IListElementActions {
  mapId: string;
  onDelete: () => void;
}

const ListElementActions: React.FC<IListElementActions> = ({ mapId, onDelete }) => {
  const [displayConfirmDeleteModal, setDisplayConfirmDeleteModal] =
    useState(false);

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button className="px-2">
          <MoreHorizontal size={20} />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={`fixed right-4 w-48 origin-top-right divide-y p-2 divide-[${PRIMARY_BRAND_COLOR}] rounded-md bg-secondary-brand-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            style={{ zIndex: 100 }}
          >
            <div className="px-1 py-1">
              <Menu.Item>
                <button
                  onClick={() => setDisplayConfirmDeleteModal(true)}
                  className={MENU_BUTTON_CLASSNAMES}
                >
                  <Trash size={16} />
                  <span>Delete</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <ConfirmDeleteModal
        display={displayConfirmDeleteModal}
        onClose={() => setDisplayConfirmDeleteModal(false)}
        mapId={mapId}
        onDeleteConfirm={onDelete}
      />
    </>
  );
};

export default ListElementActions;
