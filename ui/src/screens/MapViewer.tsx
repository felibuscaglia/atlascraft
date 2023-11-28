import { useParams } from "react-router-dom";

const MapViewerScreen = () => {
  const { mapId = "" } = useParams();

  return <div>MAP VIEWER SCREEN</div>;
};

export default MapViewerScreen;
