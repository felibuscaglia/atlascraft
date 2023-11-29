import LinkCopier from "components/LinkCopier";
import DialogLayout from "layouts/Dialog";
import { UI_PATHS } from "lib/constants/paths";

interface IProps {
  display: boolean;
  onClose: () => void;
  mapId: string;
}

const ShareMapDialog: React.FC<IProps> = ({ display, onClose, mapId }) => {
  return (
    <DialogLayout
      display={display}
      onDialogClose={onClose}
      title="Share map"
      color="brand"
    >
      <LinkCopier url={UI_PATHS.VIEW_MAP.replace(':mapId', mapId)} />
    </DialogLayout>
  );
};

export default ShareMapDialog;
