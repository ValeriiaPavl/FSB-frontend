import { useState, useEffect, ReactEventHandler, SetStateAction } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { z } from "zod";

interface MapProps {
  location: number[] | null;
  setLocation: React.Dispatch<React.SetStateAction<number[] | null>>;
}

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";

const svgIcon = L.divIcon({
  html: `
  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="red" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
</svg>
`,

  className: "",
  iconSize: [40, 40],
  iconAnchor: [12, 40],
});

const DynamicMap = ({ location, setLocation }: MapProps) => {
  const [isLocationFound, setIsLocationFound] = useState(false);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          setLocation([position.coords.latitude, position.coords.longitude]);
          setIsLocationFound(true);
        },
        function (error) {
          console.error("Error obtaining geolocation: ", error);
        }
      );
    } else {
      console.log("Geolocation is not available in this browser");
    }
  }, []);

  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const { lat, lng } = e.latlng;
    console.log(`Map clicked at Latitude ${lat}, Longitude ${lng}`);
    setLocation([lat, lng]);
  };

  return (
    <div className=" border-2 border-zinc-300 ">
      {isLocationFound ? (
        <MapContainer
          className="h-80 w-full "
          center={location}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location} icon={svgIcon}>
            <Popup>You are here!</Popup>
          </Marker>
          <MapClickHandler handler={handleMapClick} />
        </MapContainer>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

interface MapClickHandlerProps {
  handler: (e: L.LeafletMouseEvent) => void;
}
const MapClickHandler = (props: MapClickHandlerProps) => {
  const map = useMapEvents({
    click: props.handler,
  });
  return null;
};

export default DynamicMap;
