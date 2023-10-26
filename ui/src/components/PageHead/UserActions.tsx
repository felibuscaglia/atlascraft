import { LogOut, Map, User } from "react-feather";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { PRIMARY_BRAND_COLOR } from "lib/constants/styles";

const btnClassnames =
  "text-primary-brand-color hover:underline group flex w-full items-center gap-2  px-2 py-2 text-sm rounded-sm";

const UserActions = () => {
  const signOut = () => {};
  return (
    <div>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="rounded-full border-2 border-secondary-brand-color p-2 text-secondary-brand-color hover:bg-secondary-brand-color hover:text-primary-brand-color">
            <User />
          </Menu.Button>
        </div>
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
            className={`fixed right-4 mt-3 w-48 origin-top-right divide-y p-2 divide-[${PRIMARY_BRAND_COLOR}] rounded-md bg-secondary-brand-color shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
            style={{ zIndex: 100 }}
          >
            <div className="px-1 py-1">
              <Menu.Item>
                <button className={btnClassnames}>
                  <Map size={12} />
                  <span>Maps</span>
                </button>
              </Menu.Item>
            </div>
            <div className="px-1 py-1">
              <Menu.Item>
                <button className={btnClassnames}>
                  <LogOut size={12} />
                  <span>Sign Out</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserActions;
