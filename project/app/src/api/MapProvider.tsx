"use client";

import { ReactNode } from "react";
import { useJsApiLoader, Libraries } from "@react-google-maps/api";

type MapWrapperProps = {
  children: ReactNode;
};

export const MapProvider: React.FC<MapWrapperProps> = ({ children }) => {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey:
      (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string) || "",
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  if (!scriptLoaded) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};
