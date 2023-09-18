import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { Map } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const DEFAULT_ZOOM_LEVEL = 11;
const DEFAULT_LNG = -70.9;
const DEFAULT_LAT = 42.35;

const MapComponent = () => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<Map | null>(null);

  useEffect(() => {
    if (map.current || !mapContainer.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [DEFAULT_LNG, DEFAULT_LAT],
      zoom: DEFAULT_ZOOM_LEVEL,
    });
  }, [map]);

  return <div ref={mapContainer} className="map-container" />;
};

export default MapComponent;
