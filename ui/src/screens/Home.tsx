import List from "components/List";
import AuthGuard from "guards/Auth";
import { API_PATHS, UI_PATHS } from "lib/constants/paths";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IListElement } from "lib/interfaces";
import { IMap } from "lib/interfaces/entities";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const formatUserMapsAsListElements = (userMaps: IMap[]): IListElement[] => {
  return userMaps.map(({ name }) => ({
    title: name,
  }));
};

const HomeScreen = () => {
  const [creatingMap, setCreatingMap] = useState(false);

  const axiosAuth = useAxiosAuth();
  const navigate = useNavigate();

  const createMap = () => {
    setCreatingMap(true);
    axiosAuth
      .post<IMap>(API_PATHS.CREATE_MAP)
      .then(({ data }) =>
        navigate(`/${UI_PATHS.EDIT_MAP.replace(":mapId", data.id)}`),
      )
      .catch((err) => console.error(err));
  };
  return (
    <AuthGuard<IMap[]> apiPath={API_PATHS.GET_USER_MAPS}>
      {(userMaps) => (
        <div className="grow p-4">
          <List
            title="Your maps"
            actionBtnProps={{
              text: "Create a new map",
              onClick: createMap,
              loading: creatingMap,
            }}
            elements={formatUserMapsAsListElements(userMaps || [])}
            emptyPlaceholderText="No maps created."
          />
        </div>
      )}
    </AuthGuard>
  );
};

export default HomeScreen;
