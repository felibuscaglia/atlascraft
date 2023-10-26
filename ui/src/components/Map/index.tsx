import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef } from "react";
import FeatureList from "./FeatureList";
import { IMap } from "lib/interfaces/entities";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const DEFAULT_ZOOM_LEVEL = 11;
const DEFAULT_LNG = -70.9;
const DEFAULT_LAT = 42.35;

interface IMapComponentProps {
  map: IMap;
}

const MapComponent: React.FC<IMapComponentProps> = ({ map }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<Map | null>(null);

  useEffect(() => {
    if (mapRef.current || !mapContainer.current) return;

    mapRef.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [DEFAULT_LNG, DEFAULT_LAT],
      zoom: DEFAULT_ZOOM_LEVEL,
    });
  }, [map]);

  return (
    <div ref={mapContainer} className="map-container h-screen w-full">
      <FeatureList mapName={map.name} />
    </div>
  );
};

export default MapComponent;
