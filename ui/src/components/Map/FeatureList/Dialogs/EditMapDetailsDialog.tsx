import Input from "components/Input";
import TextArea from "components/TextArea";
import DialogLayout from "layouts/Dialog";
import { UNEXPECTED_ERROR_MSG } from "lib/constants/error-messages";
import { API_PATHS } from "lib/constants/paths";
import { MapContext } from "lib/contexts";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IMap } from "lib/interfaces/entities";
import { useState, useContext } from "react";

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
  const [error, setError] = useState<string | string[] | null>(null);
  const [input, setInput] = useState({
    name: map.name,
    description: map.description,
  });

  const axiosAuth = useAxiosAuth();

  const { setMap } = useContext(MapContext);

  const updateMapDetails = () => {
    setUpdatingMapDetails(true);
    setError(null);

    const apiPath = API_PATHS.UPDATE_MAP.replace(":mapId", map.id);
    axiosAuth
      .patch<IMap>(apiPath, input)
      .then(({ data }) => {
        setMap({
          ...map,
          ...data,
        });
        setUpdatingMapDetails(false);
        onClose();
      })
      .catch((err) => {
        const errorMessages: string[] = err.response?.data?.message;

        setError(errorMessages.length ? errorMessages : UNEXPECTED_ERROR_MSG);
        setUpdatingMapDetails(false);
      });
  };

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
      btnText="Update"
      color="brand"
      error={error || undefined}
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
          value={input.description || ""}
          onChange={handleInputChange}
        />
      </form>
    </DialogLayout>
  );
};

export default EditMapDetailsDialog;
