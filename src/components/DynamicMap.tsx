import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { z } from "zod";

const userCoordinatesValidator = z.object({
  city_of_residence_latitude: z.string(),
  city_of_residence_longitude: z.string(),
});

type userCoordinates = z.infer<typeof userCoordinatesValidator>;

const DynamicMap = ({
  city_of_residence_latitude,
  city_of_residence_longitude,
}: userCoordinates) => {
  useEffect(() => {
    const map = L.map("map").setView([52, 6], 8);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    const marker = L.marker([
      parseFloat(city_of_residence_latitude),
      parseFloat(city_of_residence_longitude),
    ])
      .addTo(map)
      .bindPopup("Here I live")
      .openPopup();

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default DynamicMap;
