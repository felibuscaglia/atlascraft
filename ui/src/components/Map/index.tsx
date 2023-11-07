import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import FeatureList from "./FeatureList";
import { ILayer, IMap, IMarker } from "lib/interfaces/entities";
import ReactDOMServer from "react-dom/server";
import { Search } from "react-feather";
import { SECONDARY_BRAND_COLOR } from "lib/constants/styles";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import useAxiosAuth from "lib/hooks/useAxiosAuth";
import { API_PATHS } from "lib/constants/paths";
import {
  UNAUTHORIZED_MAP_ERROR_MSG,
  UNEXPECTED_ERROR_MSG,
} from "lib/constants/error-messages";
import { HttpStatusCode } from "axios";
import ErrorScreen from "screens/Error";
import MarkerDetailSidebar from "./MarkerDetailSidebar";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const DEFAULT_ZOOM_LEVEL = 1;
const DEFAULT_LNG = -70.9;
const DEFAULT_LAT = 42.35;

const generatePopup = (
  displayName: string,
  name: string,
  buttonText = "+ Add to map",
) => {
  const popupContent = document.createElement("div");
  popupContent.innerHTML = `
    <div>
      <section>
        <h1>${displayName}</h1>
        <p>${name}</p>
      </section>
      <button class='add-btn'>${buttonText}</button>
    </div>
  `;

  return popupContent;
};

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

    const popupContent = generatePopup(text, place_name);

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

  return map;
};

interface IMapComponentProps {
  map: IMap;
}

const MapComponent: React.FC<IMapComponentProps> = ({ map }) => {
  const [error, setError] = useState<string | null>(null);
  const [layers, setLayers] = useState<ILayer[]>(map.layers);
  const [selectedLayer, setSelectedLayer] = useState(0);

  const axiosAuth = useAxiosAuth();

  const mapContainer = useRef<HTMLDivElement | null>(null);

  const saveMarker = (result: MapboxGeocoder.Result) => {
    const layerIndex = selectedLayer;

    const { center, text, place_name, id } = result;

    const newMarker = {
      latitude: center[0],
      longitude: center[1],
      displayName: text,
      name: place_name,
      externalId: id,
      mapId: map.id,
      layerId: layers[layerIndex].id,
    };

    axiosAuth
      .post<IMarker>(API_PATHS.SAVE_MARKER, newMarker)
      .then(({ data }) => {
        setLayers((prevLayers) => {
          const updatedLayers = [...prevLayers];

          updatedLayers[layerIndex].markers = [
            ...updatedLayers[layerIndex].markers,
            data,
          ];

          return updatedLayers;
        });
      })
      .catch((err) =>
        setError(
          err.response?.status === HttpStatusCode.Forbidden
            ? UNAUTHORIZED_MAP_ERROR_MSG
            : UNEXPECTED_ERROR_MSG,
        ),
      );
  };

  useEffect(() => {
    if (!mapContainer.current) return;

    const map = initializeMap(mapContainer, saveMarker);

    layers.forEach(({ markers }) => {
      markers.forEach(({ place, customDisplayName }) => {
        new mapboxgl.Marker()
          .setLngLat([place.latitude, place.longitude])
          .setPopup(
            new mapboxgl.Popup().setDOMContent(
              generatePopup(
                customDisplayName ?? place.displayName,
                place.name,
                "Edit",
              ),
            ),
          )
          .addTo(map);
      });
    });
  }, [map]);

  if (error) {
    return <ErrorScreen msg={error} />;
  }

  return (
    <div ref={mapContainer} className="map-container flex w-full grow">
      <FeatureList mapName={map.name} layers={layers} />
      <MarkerDetailSidebar />
    </div>
  );
};

export default MapComponent;
