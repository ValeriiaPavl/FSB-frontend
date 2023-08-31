import { useState, useEffect } from "react";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const DynamicMap = () => {
  useEffect(() => {
    const map = L.map("map").setView([51.505, -0.09], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    return () => {
      map.remove();
    };
  }, []);

  return <div id="map" style={{ width: "100%", height: "400px" }}></div>;
};

export default DynamicMap;
