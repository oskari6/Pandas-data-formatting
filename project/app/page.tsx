"use client";

import React, { useEffect, useState } from "react";
import Preview from "./src/components/Preview";
import { MapComponent } from "./src/api/MapComponent";
import { MapProvider } from "./src/api/MapProvider";

type OptionButtonsProps = {
  toggle: () => void;
};

export default function Home() {
  const [mapView, setMapView] = useState(false);
  const toggleMap = () => {
    setMapView(!mapView);
  };
  return (
    <div className="relative">
      <div className="gap-4 flex justify-center sticky top-0 w-full bg-white z-50 py-2">
        <input
          className="border rounded-lg text-[20px] p-1"
          placeholder="Address"
        />
        <button className="border border-gray-400 p-2 rounded">For Sale</button>
        <button className="border border-gray-400 p-2 rounded">Price</button>
        <button className="border border-gray-400 p-2 rounded">More</button>
        <button className="bg-blue-500 text-white p-2 rounded">
          Save search
        </button>
      </div>
      <div className="ml-5 mt-5">
        <h4>Real Estate & Homes For Sale</h4>
        <span className="text-gray-600">100000 results</span>
      </div>
      <OptionButtons toggle={toggleMap} />
      {mapView && (
        <div className="fixed inset-0 top-[20%] z-[2] w-full h-full">
          <MapProvider>
            <MapComponent />
          </MapProvider>
        </div>
      )}
    </div>
  );
}

const OptionButtons = ({ toggle }: OptionButtonsProps) => {
  return (
    <div className="z-[3] fixed bottom-10 left-1/2 transform -translate-x-1/2">
      <div className="shadow-xl bg-gray-200 rounded-lg flex justify-center">
        <button onClick={() => toggle()} className="p-5">
          Map
        </button>
        <button className="p-5">Filter</button>
      </div>
    </div>
  );
};
