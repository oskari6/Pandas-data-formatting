"use client";

import { GoogleMap } from "@react-google-maps/api";
import React from "react";

export const MapComponent = React.memo(() => {
  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = {
    lat: 34.0549,
    lng: -118.2426,
  };
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={10}
    ></GoogleMap>
  );
});
