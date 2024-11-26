"use client";

import React, { useState, useEffect, useRef } from "react";
import House from "../src/interfaces/House";
import HousePhoto from "../src/interfaces/HousePhoto";
import Preview, { EmptyPreview } from "../src/components/Preview";
import { MapComponent } from "../src/api/MapComponent";
import { MapProvider } from "../src/api/MapProvider";
import OptionButtons from "../src/utils/OptionButtons";

const Houses = React.memo(() => {
  const [houses, setHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cachedPages = useRef<{ [key: number]: House[] }>({});
  const [loading, setLoading] = useState(true);
  const [totalHouses, setTotalHouses] = useState(null);
  useEffect(() => {
    const fetchHouses = async () => {
      if (cachedPages.current[page]) {
        setHouses(cachedPages.current[page]);
        return;
      }
      try {
        setLoading(true);
        const res = await fetch(
          `http://localhost:8000/api/houses?page=${page}&limit=42`,
          {
            cache: "no-store",
          }
        );
        const result = await res.json();

        if (!res.ok) {
          throw new Error("Failed to fetch houses: ", result.message);
        }

        cachedPages.current[page] = result.data;
        setHouses(result.data);
        setTotalPages(result.totalPages);
        setTotalHouses(result.total);
      } catch (error) {
        console.error("frontend error: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchHouses();
  }, [page]);

  return (
    <div className="select-none">
      <span className="select-none text-gray-600 ml-5">
        {totalHouses} results
      </span>
      <ul className="p-3 flex-wrap flex gap-2">
        {houses.length > 0 ? (
          houses.map((house) => (
            <li key={house.house_id}>
              <a>{house ? <Preview house={house} /> : <EmptyPreview />}</a>
            </li>
          ))
        ) : (
          <p>No houses</p>
        )}
      </ul>
      <div className="flex justify-center items-center gap-3">
        <button
          className="p-2 bg-gray-300 rounded"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <button
          className="p-2 bg-gray-300 rounded"
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
        >
          Next
        </button>
      </div>
      <div className="flex justify-center">
        <span>
          Page {page} of {totalPages}
        </span>
      </div>
    </div>
  );
});

const BuyPage = () => {
  const [mapWidth, setMapWidth] = useState(1170);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isFullscreenMap, setIsFullscreenMap] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const minWidth = 620;
  const maxWidth = windowWidth - 350;

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => setWindowWidth(window.innerWidth);
      setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const handleDrag = throttle((e: MouseEvent) => {
    if (typeof window !== undefined) {
      window.requestAnimationFrame(() => {
        const newWidth = e.clientX;
        if (newWidth > minWidth && newWidth < maxWidth) {
          setMapWidth(newWidth);
        }
      });
    }
  }, 20);

  const startDrag = () => {
    if (typeof document !== undefined) {
      document.addEventListener("mousemove", handleDrag);
      document.addEventListener("mouseup", stopDrag);
    }
  };

  const stopDrag = () => {
    if (typeof document !== undefined) {
      document.removeEventListener("mousemove", handleDrag);
      document.removeEventListener("mouseup", stopDrag);
    }
  };

  const toggleFullScreenMap = () => {
    setIsFullscreenMap((prev) => !prev);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      const updateScreenSize = () => setIsSmallScreen(window.innerWidth < 1000);
      updateScreenSize();
      window.addEventListener("resize", updateScreenSize);
      return () => window.removeEventListener("resize", updateScreenSize);
    }
  }, []);

  return (
    <div className="h-[80%]">
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
      {isSmallScreen ? (
        <div className="flex h-full">
          {isFullscreenMap ? (
            <div className="w-full h-full">
              <MapProvider>
                <MapComponent />
              </MapProvider>
            </div>
          ) : (
            <div className="h-full overflow-y-auto">
              <div className="ml-5 mt-5">
                <h4 className="select-none">Real Estate & Homes For Sale</h4>
              </div>
              <Houses />
            </div>
          )}
          <div className="fixed bottom-4 right-4 z-50 flex gap-2">
            {!isFullscreenMap && (
              <OptionButtons toggle={toggleFullScreenMap} text="Map" />
            )}
            {isFullscreenMap && (
              <OptionButtons toggle={toggleFullScreenMap} text="List" />
            )}
          </div>
        </div>
      ) : (
        <div className="flex h-full">
          <div style={{ width: `${mapWidth}px` }} className="relative h-full">
            <MapProvider>
              <MapComponent />
            </MapProvider>
          </div>
          <div
            className="w-2 bg-gray-400 cursor-col-resize"
            onMouseDown={startDrag}
          ></div>
          <div
            style={{ width: `calc(100% - ${mapWidth}px)` }}
            className="h-full overflow-y-auto"
          >
            <div className="ml-5 mt-5">
              <h4 className="select-none">Real Estate & Homes For Sale</h4>
            </div>
            <Houses />
          </div>
        </div>
      )}
    </div>
  );
};

const throttle = (func: (...args: any[]) => void, limit: number) => {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;

  return (...args: any[]) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

export default BuyPage;
