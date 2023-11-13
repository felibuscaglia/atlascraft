import Map from "components/Map";
import AuthGuard from "guards/Auth";
import { API_PATHS } from "lib/constants/paths";
import { IMap } from "lib/interfaces/entities";
import { useParams } from "react-router-dom";

const MapEditorScreen = () => {
  const { mapId = "" } = useParams();

  return (
    <AuthGuard<IMap> apiPath={API_PATHS.GET_MAP.replace(":mapId", mapId)}>
      {(map, setMap) => <Map map={map} setMap={setMap} />}
    </AuthGuard>
  );
};

export default MapEditorScreen;
