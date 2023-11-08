import { Fragment } from "react";
import { Transition, Menu } from "@headlessui/react";
import {
  MENU_BUTTON_CLASSNAMES,
  PRIMARY_BRAND_COLOR,
} from "lib/constants/styles";
import { MoreVertical, Plus, Settings } from "react-feather";

interface IMapFeatureListProps {
    displayDialog: () => void;
}

const MapFeatureListOptions: React.FC<IMapFeatureListProps> = ({ displayDialog }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button>
        <MoreVertical color={PRIMARY_BRAND_COLOR} size={20} />
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
          className={`absolute -top-2 left-7 w-48 origin-top-left divide-y divide-[${PRIMARY_BRAND_COLOR}] rounded-md bg-secondary-brand-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
          style={{ zIndex: 100 }}
        >
          <div className="px-1 py-px">
            <Menu.Item>
              <button className={MENU_BUTTON_CLASSNAMES} onClick={displayDialog}>
                <Settings size={16} />
                <span>Edit map details</span>
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-px">
            <Menu.Item>
              <button className={MENU_BUTTON_CLASSNAMES}>
                <Plus size={16} />
                <span>Invite collaborator</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MapFeatureListOptions;
