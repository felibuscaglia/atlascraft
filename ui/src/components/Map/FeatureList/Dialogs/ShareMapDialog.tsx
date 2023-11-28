import DialogLayout from "layouts/Dialog";

interface IProps {
  display: boolean;
  onClose: () => void;
}

const ShareMapDialog: React.FC<IProps> = ({ display, onClose }) => {
  return (
    <DialogLayout
      display={display}
      onDialogClose={onClose}
      onButtonClick={() => {}}
      title="Share map"
      color="brand"
    >
      <h1>Share</h1>
    </DialogLayout>
  );
};

export default ShareMapDialog;
