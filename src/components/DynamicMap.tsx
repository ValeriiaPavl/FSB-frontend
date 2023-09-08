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

const DynamicMap = ({ location, setLocation }: MapProps) => {
  // const [location, setLocation] = useState([51.505, -0.09]); // Default to some location
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
    <div className="w-full h-[400px]">
      {isLocationFound ? (
        <MapContainer
          className="h-80 w-full"
          center={location}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location}>
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
