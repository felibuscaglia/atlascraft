import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import FeatureList from "./FeatureList";
import { IMap, IMarker } from "lib/interfaces/entities";
import ReactDOMServer from "react-dom/server";
import { Search } from "react-feather";
import { SECONDARY_BRAND_COLOR } from "lib/constants/styles";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants/paths";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const DEFAULT_ZOOM_LEVEL = 11;
const DEFAULT_LNG = -70.9;
const DEFAULT_LAT = 42.35;

const initializeMap = (
  mapContainerRef: React.RefObject<HTMLDivElement>,
  saveMarker: (result: MapboxGeocoder.Result) => void,
) => {
  const map = new mapboxgl.Map({
    container: mapContainerRef.current!,
    style: "mapbox://styles/mapbox/streets-v12",
    center: [DEFAULT_LNG, DEFAULT_LAT],
    zoom: DEFAULT_ZOOM_LEVEL,
  });

  const geocoderContainer = document.createElement("div");

  geocoderContainer.className =
    "flex items-center top-20 fixed right-4 w-3/12 rounded-sm";

  const searchBtn = document.createElement("button");
  searchBtn.className =
    "h-10 bg-primary-brand-color px-4 relative rounded-r-sm";
  const searchIconHTML = ReactDOMServer.renderToString(
    <Search size={20} color={SECONDARY_BRAND_COLOR} />,
  );
  searchBtn.innerHTML = searchIconHTML;

  const geocoder = new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
    placeholder: "Search for places around the world",
  });

  geocoder.on("result", (event: { result: MapboxGeocoder.Result }) => {
    const { center, place_name, text } = event.result;

    const popupContent = document.createElement("div");
    popupContent.innerHTML = `
    <div>
      <section>
        <h1>${text}</h1>
        <p>${place_name}</p>
      </section>
      <button class='add-btn'>+ Add to map</button>
    </div>
  `;

    const addButton = popupContent.querySelector(".add-btn");

    if (addButton) {
      addButton.addEventListener("click", () => saveMarker(event.result));
    }

    new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(center as LngLatLike)
      .setDOMContent(popupContent)
      .addTo(map);
  });

  map.on("load", () => {
    geocoderContainer.appendChild(geocoder.onAdd(map));
    map.getContainer().appendChild(geocoderContainer);
    geocoderContainer.appendChild(searchBtn);
  });
};

interface IMapComponentProps {
  map: IMap;
}

const MapComponent: React.FC<IMapComponentProps> = ({ map }) => {
  const [markers, setMarkers] = useState<IMarker[]>(map.markers);

  const axiosAuth = useAxiosAuth();

  const mapContainer = useRef<HTMLDivElement | null>(null);

  const saveMarker = (result: MapboxGeocoder.Result) => {
    const body = {
      latitude: result.center[0],
      longitude: result.center[1],
      displayName: result.text,
      name: result.place_name,
      externalId: result.id,
      mapId: map.id,
    };

    axiosAuth
      .post(API_PATHS.SAVE_MARKER, body)
      .then(({ data }) => console.log({ data }))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    initializeMap(mapContainer, saveMarker);
  }, [map]);

  return (
    <div ref={mapContainer} className="map-container h-screen w-full">
      <FeatureList mapName={map.name} />
    </div>
  );
};

export default MapComponent;
