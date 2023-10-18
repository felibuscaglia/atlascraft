import List from "components/List";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants/paths";
import { IMap } from "lib/interfaces/entities";

const HomeScreen = () => {
  return (
    <AuthGuard<IMap[]> apiPath={API_PATHS.GET_USER_MAPS}>
      {(userMaps) => (
        <div className="p-4">
          <List title="Your maps" />
        </div>
      )}
    </AuthGuard>
  );
};

export default HomeScreen;
