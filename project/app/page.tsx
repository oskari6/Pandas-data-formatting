"use client";

import React, { useEffect } from "react";
import Orders from "./components/Orders";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 40.7128,
  lng: -74.006,
};

const MapComponent = () => {
  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
    >
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={10}
      ></GoogleMap>
    </LoadScript>
  );
};
export default function Home() {
  return (
    <div>
      <h1>map</h1>
      <MapComponent />
    </div>
  );
}
