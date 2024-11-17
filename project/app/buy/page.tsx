"use client";

import React, { useState, useEffect, useRef } from "react";
import House from "../src/interfaces/House";
import HousePhoto from "../src/interfaces/HousePhoto";
import Preview from "../src/components/Preview";

function Houses() {
  const [houses, setHouses] = useState<House[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const cachedPages = useRef<{ [key: number]: House[] }>({});

  useEffect(() => {
    const fetchHouses = async () => {
      if (cachedPages.current[page]) {
        setHouses(cachedPages.current[page]);
        return;
      }
      try {
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
      } catch (error) {
        console.error("frontend error: ", error);
      }
    };
    fetchHouses();
  }, [page]);

  return (
    <div>
      <span className="text-gray-600 ml-5">{totalPages} results</span>
      <ul className="p-3 flex-wrap flex gap-2">
        {houses.map((house: any) => (
          <li key={house.house_id}>
            <Preview house={house} />
          </li>
        ))}
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
}
const BuyPage = () => {
  return (
    <div>
      <div className="ml-5 mt-5">
        <h4>Real Estate & Homes For Sale</h4>
      </div>
      <Houses />
    </div>
  );
};

export default BuyPage;
