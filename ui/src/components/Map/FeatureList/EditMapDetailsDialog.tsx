import Input from "components/Input";
import TextArea from "components/TextArea";
import DialogLayout from "layouts/Dialog";
import { IMap } from "lib/interfaces/entities";
import { useState } from "react";

interface IEditMapDetailsDialogProps {
  display: boolean;
  onClose: () => void;
  map: IMap;
}

const EditMapDetailsDialog: React.FC<IEditMapDetailsDialogProps> = ({
  display,
  onClose,
  map,
}) => {
  const [updatingMapDetails, setUpdatingMapDetails] = useState(false);
  const [input, setInput] = useState({
    name: map.name,
    description: map.description || "",
  });

  const updateMapDetails = () => {};

  const handleInputChange = ({
    target,
  }: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setInput({
      ...input,
      [target.id]: target.value,
    });
  };

  return (
    <DialogLayout
      display={display}
      performingAction={updatingMapDetails}
      onDialogClose={onClose}
      onButtonClick={updateMapDetails}
      title="Edit map details"
    >
      <form className="my-4 flex flex-col gap-4">
        <Input
          id="name"
          label="Name"
          value={input.name}
          onChange={handleInputChange}
          size="small"
        />
        <TextArea
          id="description"
          label="Description"
          value={input.description}
          onChange={handleInputChange}
        />
      </form>
    </DialogLayout>
  );
};

export default EditMapDetailsDialog;
