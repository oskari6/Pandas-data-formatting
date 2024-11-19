import Image from "next/image";
import House from "../interfaces/House";
import HousePhoto from "../interfaces/HousePhoto";
import { useState } from "react";

const Preview = ({ house }: { house: House }) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const price = formatCurrency(house.price);

  return (
    <div className="select-none relative w-[300px] h-[290px] flex flex-col shadow-xl rounded-xl">
      <div className="select-none w-full h-[180px] relative rounded-t-xl overflow-hidden">
        <HousePreviewCarousel photos={house.photos} />
      </div>
      <div>
        <h4>{price}</h4>
        <div className="flex text-[14px]">
          <div className="h-[25px] p-1 border-r-2 border-gray-300">
            <b>{house.bed}</b>
            <abbr>bds</abbr>
          </div>
          <div className=" h-[25px] p-1 border-r-2 border-gray-300">
            <b>{house.bath}</b>
            <abbr>ba</abbr>
          </div>
          <div className=" h-[25px] p-1">
            <b>{house.house_size > BigInt(0) && house.house_size}</b>
            {house.house_size > BigInt(0) && <abbr>sqft</abbr>} - House for sale
          </div>
        </div>
      </div>
      <span className="text-[14px]">{house.address}</span>
      <span className="text-[10px]">{house.agent?.agency || "null"}</span>
      <span className="text-white absolute top-2 left-2 p-1 bg-black/50 rounded-xl text-[12px] font-bold">
        {house.property_type || null}
      </span>
      <div className="absolute top-2 right-2">
        <button>
          <svg
            width="40px"
            height="40px"
            viewBox="0 0 24 24"
            fill="gray"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export const EmptyPreview = () => {
  return (
    <div className="relative w-[300px] h-[290px] flex flex-col shadow-xl rounded-xl">
      <div className="w-full h-[180px] relative rounded-t-xl overflow-hidden">
        <div className="skeleton-loader">
          <div className="image-placeholder" />
          <div className="text-placeholder" />
          <div className="text-placeholder short" />
        </div>
      </div>
    </div>
  );
};

export const HousePreviewCarousel = ({ photos }: { photos?: HousePhoto[] }) => {
  const [index, setIndex] = useState(0);

  const next = () => {
    if (photos && index < photos.length - 1) {
      setIndex((prev) => prev + 1);
    }
  };

  const back = () => {
    if (photos && index !== 0) {
      setIndex((prev) => prev - 1);
    }
  };

  if (!photos || photos.length === 0) {
    return (
      <div className="flex items-center justify-center w-full h-full bg-gray-200">
        No photos available
      </div>
    );
  }
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        style={{
          transform: `translateX(-${index * 100}%)`,
        }}
        className="relative w-full h-full transition-transform duration-1000 ease-in-out"
      >
        {photos.map((photo, photoIndex) => (
          <div
            key={photoIndex}
            className="absolute top-0 left-0 w-full h-full"
            style={{
              transform: `translateX(${photoIndex * 100}%)`,
            }}
          >
            <Image
              className="object-cover"
              src={photo.photo_url}
              alt={`Slide ${photoIndex + 1}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
      <button
        onClick={back}
        className="opacity-0 hover:opacity-100 transition-opacity font-bold text-white w-10 h-10 bg-black bg-opacity-50 absolute top-[50%] left-2 transform -translate-y-1/2 rounded-full"
      >
        &lt;
      </button>
      <button
        onClick={next}
        className=" opacity-0 hover:opacity-100 transition-opacity font-bold text-white w-10 h-10 bg-black bg-opacity-50 w-10 h-10 bg-black/50 absolute top-[50%] right-2 transform -translate-y-1/2 rounded-full"
      >
        &gt;
      </button>
    </div>
  );
};
export default Preview;
