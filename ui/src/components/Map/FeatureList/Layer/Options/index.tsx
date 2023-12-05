import { Menu, Transition } from "@headlessui/react";
import {
  MENU_BUTTON_CLASSNAMES,
  PRIMARY_BRAND_COLOR,
} from "lib/constants/styles";
import { Edit, IconProps, MoreVertical, Trash } from "react-feather";
import { Fragment, useState, useContext } from "react";
import EditNameDialog from "./EditNameDialog";
import { ILayer } from "lib/interfaces/entities";
import DialogLayout from "layouts/Dialog";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";
import toast from "react-hot-toast";
import { UNEXPECTED_ERROR_MSG } from "lib/constants/error-messages";

const ICON_PROPS: IconProps = {
  size: 16,
  color: PRIMARY_BRAND_COLOR,
};

interface IDialogDisplay {
  editLayerName: boolean;
  deleteLayer: boolean;
}

interface IProps {
  layer: ILayer;
}

const LayerOptions: React.FC<IProps> = ({ layer }) => {
  const [displayDialog, setDisplayDialog] = useState<IDialogDisplay>({
    editLayerName: false,
    deleteLayer: false,
  });
  const [deletingLayer, setDeletingLayer] = useState(false);

  const axiosAuth = useAxiosAuth();

  const { map, setMap } = useContext(MapContext);

  const toggleDialog = (key: keyof IDialogDisplay, display: boolean) => {
    setDisplayDialog({
      ...displayDialog,
      [key]: display,
    });
  };

  const deleteLayer = () => {
    setDeletingLayer(true);

    const path = API_PATHS.DELETE_LAYER.replace(":layerId", layer.id).replace(
      ":mapId",
      map.id,
    );

    axiosAuth
      .delete(path)
      .then(() => {
        setMap({
          ...map,
          layers: map.layers.filter(l => l.id !== layer.id),
        });

        setDeletingLayer(false);
        toggleDialog("deleteLayer", false);
      })
      .catch(() => {
        toast.error(UNEXPECTED_ERROR_MSG);
        setDeletingLayer(false);
      });
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <Menu.Button>
          <MoreVertical color={PRIMARY_BRAND_COLOR} size={16} />
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
                <button
                  className={MENU_BUTTON_CLASSNAMES}
                  onClick={() => toggleDialog("editLayerName", true)}
                >
                  <Edit {...ICON_PROPS} />
                  <span>Edit layer name</span>
                </button>
              </Menu.Item>
            </div>
            <div className="px-1 py-px">
              <Menu.Item>
                <button
                  className={MENU_BUTTON_CLASSNAMES}
                  onClick={() => toggleDialog("deleteLayer", true)}
                >
                  <Trash {...ICON_PROPS} />
                  <span>Delete layer</span>
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
      <EditNameDialog
        display={displayDialog.editLayerName}
        layer={layer}
        onClose={() => toggleDialog("editLayerName", false)}
      />
      <DialogLayout
        display={displayDialog.deleteLayer}
        onDialogClose={() => toggleDialog("deleteLayer", false)}
        title="Are you sure you want to delete this layer?"
        color="danger"
        btnText="Delete"
        onButtonClick={deleteLayer}
        performingAction={deletingLayer}
      />
    </>
  );
};

export default LayerOptions;
