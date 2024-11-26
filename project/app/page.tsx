"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  return (
    <div className="">
      <div className=" w-full relative h-[400px]">
        <img
          className="h-full w-full object-cover"
          alt="home-1"
          src="/home-banner.jpg"
        />
        <div className="flex-col absolute inset-0 top-0 flex items-center justify-center bg-black/50">
          <div className="text-center">
            <h2 className="text-white font-bold">
              Buy, Sell, Rent, Find agents.
            </h2>
            <h2 className="text-white font-bold">All at your fingertips</h2>
          </div>
          <div className="relative w-[400px]">
            <input
              className="w-[300px] rounded-xl p-4 pr-11 w-full pt-5 pb-5"
              placeholder="Enter address/ZIP code/city in California"
            />
            <div className="absolute top-4 right-4">
              <svg
                width="25px"
                height="25px"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                  stroke="#000000"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[400px] flex pt-20">
        <div className="w-full p-5 flex flex-col justify-center pl-20">
          <h3>Sign up now</h3>
          <p>Save your favorites and get bonuses</p>
          <p>Get recommendations</p>
          <p>Notifications when prices change</p>
        </div>
        <div className="w-full flex justify-end flex-col items-center gap-2">
          <img
            className="h-full w-auto object-cover"
            alt="user-home"
            src="/user-sample.jpg"
          />
          <button className="bg-blue-500 rounded p-2">Sign up</button>
        </div>
      </div>
      {/*containers*/}
      <div className="grid gap-6 md:grid-cols-3 p-4 pt-10">
        <a href="/buy">
          <div className="pb-[25%] relative h-[300px] w-full rounded-lg shadow-lg border-[2px] p-5">
            <img className="w-16 h-16 mr-4" alt="home-buy" src="/dollar.jpg" />
            <div>
              <h3>Buy</h3>
              <p>
                Find your place with an immersive photo experience and the most
                listings, including things you won’t find anywhere else.
              </p>
              <button className="absolute bottom-3 border-2 border-blue-500 rounded-lg p-2 font-bold">
                Look at houses
              </button>
            </div>
          </div>
        </a>
        <a href="/sell">
          <div className=" relative h-[300px] w-full rounded-lg shadow-lg border-[2px] p-5">
            <div className="flex">
              <img
                className="w-16 h-16 mr-4"
                alt="home-sell"
                src="/for-sale.jpg"
              />
            </div>
            <div>
              <h3>Sell</h3>
              <p>
                No matter what path you take to sell your home, we can help you
                navigate a successful sale.
              </p>
              <button className="absolute bottom-3 border-2 border-blue-500 rounded-lg p-2 font-bold">
                Create a listing
              </button>
            </div>
          </div>
        </a>
        <a href="/rent">
          <div className=" relative h-[300px] w-full rounded-lg shadow-lg border-[2px] p-5">
            <div>
              <img
                className="w-16 h-16 mr-4"
                alt="home-rent"
                src="/rent.webp"
              />
            </div>
            <div>
              <h3>Rent</h3>
              <p>
                We’re creating a seamless online experience – from shopping on
                the largest rental network, to applying, to paying rent
              </p>
              <button className="absolute bottom-3 border-2 border-blue-500 rounded-lg p-2 font-bold">
                discover what's for rent
              </button>
            </div>
          </div>
        </a>
      </div>
      <div className="flex justify-center items-center w-full h-[500px]">
        Footer
      </div>
    </div>
  );
}
