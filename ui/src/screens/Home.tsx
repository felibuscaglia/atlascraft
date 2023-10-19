import List from "components/List";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants/paths";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { IListElement } from "lib/interfaces";
import { IMap } from "lib/interfaces/entities";
import { useState } from "react";

const formatUserMapsAsListElements = (userMaps: IMap[]): IListElement[] => {
  return userMaps.map(({ name }) => ({
    title: name,
  }));
};

const HomeScreen = () => {
  const [creatingMap, setCreatingMap] = useState(false);

  const axiosAuth = useAxiosAuth();

  const createMap = () => {
    setCreatingMap(true);
    axiosAuth
      .post<IMap>(API_PATHS.CREATE_MAP)
      .then(({ data }) => console.log(data.id))
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
