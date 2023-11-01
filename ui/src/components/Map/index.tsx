import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { useEffect, useRef } from "react";
import FeatureList from "./FeatureList";
import { IMap } from "lib/interfaces/entities";
import ReactDOMServer from "react-dom/server";
import { Search } from "react-feather";
import { SECONDARY_BRAND_COLOR } from "lib/constants/styles";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN || "";

const DEFAULT_ZOOM_LEVEL = 11;
const DEFAULT_LNG = -70.9;
const DEFAULT_LAT = 42.35;

const initializeMap = (
  mapContainerRef: React.RefObject<HTMLDivElement>,
  setSelectedPlaces: React.Dispatch<React.SetStateAction<any>>,
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
    console.log(event.result);

    new mapboxgl.Popup({ closeOnClick: true })
      .setLngLat(center as LngLatLike)
      .setHTML(
        `<div>
          <section>
            <h1 className='font-title'>${text}</h1>
            <p>${place_name}</p>
          </section>
          <button className='add-btn'>+ Add to map</button>        
        </div>`,
      )
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
  const mapContainer = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    initializeMap(mapContainer, () => {});
  }, [map]);

  return (
    <div ref={mapContainer} className="map-container h-screen w-full">
      <FeatureList mapName={map.name} />
    </div>
  );
};

export default MapComponent;
