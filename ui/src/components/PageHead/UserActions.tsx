import { LogOut, Map, User } from "react-feather";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { MENU_BUTTON_CLASSNAMES, PRIMARY_BRAND_COLOR } from "lib/constants/styles";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import { useNavigate } from "react-router-dom";

const UserActions = () => {
  const axiosAuth = useAxiosAuth();
  const navigate = useNavigate();

  const signOut = () => {
    axiosAuth
      .post(API_PATHS.SIGN_OUT)
      .then(() => navigate(UI_PATHS.SIGN_IN))
      .catch((err) => console.error(err));
  };

  return (
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
              <button
                onClick={() => navigate(UI_PATHS.HOME)}
                className={MENU_BUTTON_CLASSNAMES}
              >
                <Map size={12} />
                <span>Maps</span>
              </button>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <button onClick={signOut} className={MENU_BUTTON_CLASSNAMES}>
                <LogOut size={12} />
                <span>Sign Out</span>
              </button>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default UserActions;
